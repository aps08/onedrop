package com.backend.Controller;

import com.backend.Entity.account;
import com.backend.Entity.bank;
import com.backend.Entity.history;
import com.backend.Entity.user;
import com.backend.Repository.*;
import com.backend.Request.loginrequest;
import com.backend.Request.registerrequest;
import com.backend.Response.JwtResponse;
import com.backend.Response.message;
import com.backend.Response.searchresponse;
import com.backend.Security.UserDetailImpl;
import com.backend.Security.jwt.JwtUtils;
import com.backend.Service.JMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth/")
public class AuthController {

    @Autowired
    private historyrepo historyrepo;
    @Autowired
    private userrepo userrepo;
    @Autowired
    private adminrepo adminrepo;
    @Autowired
    private bankrepo bankrepo;
    @Autowired
    private accountrepo accountrepo;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Autowired
    private JMService emailService;
    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping(value = "register")
    public ResponseEntity<?> register(@Valid @RequestBody registerrequest register, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            System.out.println(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(new message("Incorrect input. Try again"));
        }
        if (!register.getConfirmpassword().equals(register.getPassword())){
            return ResponseEntity.badRequest().body(new message("Password and confirmpassword does not match. Try again"));
        }
        account a = accountrepo.findbyemail(register.getUsername());
        if(a!=null){
            return ResponseEntity.badRequest().body(new message("Email already exist."));
        }else{
            Date date1;
            try {
                date1 = new SimpleDateFormat("yyyy-MM-dd").parse(register.getDob());
            } catch (ParseException e) {
                return ResponseEntity.badRequest().body(new message("Date of birth is not valid"));
            }
            if (new Date().getYear() - date1.getYear()>18 && new Date().getYear() - date1.getYear() <62){
                accountrepo.save(new account(register.getUsername(),register.getPassword(),"user"));
                userrepo.save(new user(register.getUsername(),register.getFirstname(),register.getLastname(),
                        register.getDob(),register.getGender(),register.getBloodgroup(),register.getPhone(),
                        5,0,0,0,0,register.getState(),register.getCity()));
                historyrepo.save(new history(register.getUsername(),"Registered on "+ new Date()));
                historyrepo.save(new history(register.getUsername(), "Points +5 for new registeration"));
                Context context = new Context();
                context.setVariable("name",register.getFirstname()+" "+register.getLastname());
                context.setVariable("point",5);
                String html = templateEngine.process("register", context);
                try {
                    emailService.sendEmail(register.getUsername(),html,"Registration Successful");
                } catch (MessagingException e) {
                    return ResponseEntity.ok(new message("Registeration Successful. But due to some problem the email will not be delivered"));
                }
                return ResponseEntity.ok(new message("Registeration successful. Login to get access"));
            }else{
                return ResponseEntity.badRequest().body(new message("Sorry. But your age should be greater than 18 and less than 62."));
            }

        }
    }

    @PostMapping(value = "login")
    public ResponseEntity<?> login(@RequestBody loginrequest login){
        account account = accountrepo.findbyemail(login.getUsername());
        if(account!=null){
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            UserDetailImpl userDetails = (UserDetailImpl) authentication.getPrincipal();
            Map<String, Object> result = new HashMap<>();
            result.put("master", new JwtResponse(jwt, userDetails.getAuthorities()));
            if (String.valueOf(userDetails.getAuthorities()).equals("[user]")) {
                result.put("hero", userrepo.findbyemail(userDetails.getUsername()));
                historyrepo.save(new history(userDetails.getUsername(), "User LoggedIN on " + new Date()));
            } else if (String.valueOf(userDetails.getAuthorities()).equals("[admin]")) {
                System.out.println(adminrepo.findbyemail(userDetails.getUsername()));
                result.put("hero", adminrepo.findbyemail(userDetails.getUsername()));
            } else {
                return ResponseEntity.badRequest().body(new message("Something went wrong."));
            }
            System.out.println(result.toString());
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.badRequest().body(new message("User Not found with email address "+ login.getUsername()+". Register yourself"));
        }

    }

    @GetMapping(value = "search")
    public ResponseEntity<?> search(@RequestParam String state, @RequestParam String city, @RequestParam String bloodgroup) {
        searchresponse searchresponse = new searchresponse();
        bank b = bankrepo.find(state,city);
        if(b!=null){
            searchresponse.setBank(b.getBankname());
            searchresponse.setBloodgroup(bloodgroup);
            switch (bloodgroup){
                case "aplus":
                    searchresponse.setUnits(b.getAplus());
                    break;
                case "abplus":
                    searchresponse.setUnits(b.getAbplus());
                    break;
                case "bplus":
                    searchresponse.setUnits(b.getBplus());
                    break;
                case "oplus":
                    searchresponse.setUnits(b.getOplus());
                    break;
                case "aminus":
                    searchresponse.setUnits(b.getAminus());
                    break;
                case "abminus":
                    searchresponse.setUnits(b.getAbminus());
                    break;
                case "bminus":
                    searchresponse.setUnits(b.getBminus());
                    break;
                case "ominus":
                    searchresponse.setUnits(b.getOminus());
                    break;
                default:
                    return ResponseEntity.badRequest().body(new message("Some fields are missing or not in proper format."));
            }
        }else{
            return ResponseEntity.badRequest().body(new message("No record found for location"+" "+state+", "+city+". Try some other location."));
        }
        return ResponseEntity.ok(searchresponse);
    }

}

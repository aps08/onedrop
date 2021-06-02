package com.backend.Controller;

import com.backend.Entity.account;
import com.backend.Entity.history;
import com.backend.Entity.user;
import com.backend.Repository.accountrepo;
import com.backend.Repository.historyrepo;
import com.backend.Repository.userrepo;
import com.backend.Request.bloodrequest;
import com.backend.Request.camprequest;
import com.backend.Request.changepassrequest;
import com.backend.Request.editrequest;
import com.backend.Response.message;
import com.backend.Service.JMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Date;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/v1/")
public class UserController {

    @Autowired
    private accountrepo accountrepo;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Autowired
    private userrepo userrepo;
    @Autowired
    private historyrepo historyrepo;
    @Autowired
    private JMService jmService;

    @PutMapping("edit")
    public ResponseEntity<?> editinfo(@Valid @RequestBody editrequest editrequest, BindingResult bindingResult, Principal p){
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(new message("Incorrect input. Try again"));
        }
        userrepo.editUserInfo(editrequest.getState(),editrequest.getCity(),editrequest.getPhone(),p.getName());
        historyrepo.save(new history(p.getName(),"Changed state, city and phone to"+" "+editrequest.getState()+", "
        +editrequest.getCity()+", "+editrequest.getPhone()+" on "+ new Date()));
        return ResponseEntity.ok(new message("Record edited successfully. It will be visible next time when you Signin."));
    }

    @PutMapping("change")
    public ResponseEntity<?> changepassword(@Valid @RequestBody changepassrequest change, BindingResult bindingResult, Principal p){
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(new message("Incorrect input. Try again"));
        }
        if(change.getPassword().equals(change.getNewpassword())){
            return ResponseEntity.badRequest().body(new message("Current password and new password are the same. Try changing the new password"));
        }
        account a = accountrepo.findbyemail(p.getName());
        if(change.getPassword().equals(a.getPassword())){
            accountrepo.Updatepassword(change.getNewpassword(),p.getName());
            historyrepo.save(new history(p.getName(),"Password changed on"+" "+ new Date()));
            return ResponseEntity.ok(new message("Password changed successfully."));
        }else{
            return ResponseEntity.badRequest().body(new message("Password does not match try again."));
        }

    }

    @PostMapping("camps")
    public ResponseEntity<?> registercamp(@Valid @RequestBody camprequest camp, BindingResult b,Principal p){
        String role = accountrepo.getrole(p.getName());
        if (role.equals("admin")){
            return ResponseEntity.badRequest().body(new message("Admin cannot make this request."));
        }
        //THERE IS NOT DATABASE FOR CAMP OR FOR STORING REGISTERED USER ON CAMP. CAMP LOADS FROM A JSON FILE.
        if(b.hasErrors()){
            System.out.println(b.getAllErrors());
            return ResponseEntity.badRequest().body(new message("Incorrect input. Try again"));
        }
        String html;
        int points = 5;
        Context context = new Context();
        context.setVariable("address",camp.getAddress());
        context.setVariable("state",camp.getState());
        context.setVariable("city",camp.getCity());
        context.setVariable("date",camp.getDate());
        context.setVariable("role",camp.getRole());
        if(camp.getRole().equals("donor")){
            html = templateEngine.process("donor", context);
            userrepo.updateunits(0,0,0,1,0,p.getName());
            historyrepo.save(new history(p.getName(),"Camp registeration as"+" "+camp.getRole()+" at "+camp.getAddress()+", "+camp.getCity()+", "+camp.getState()+" on "+new Date()));
        }else if (camp.getRole().equals("volunteer")){
            context.setVariable("volunteerrole",camp.getVolunteerrole());
            html = templateEngine.process("volunteer", context);
            userrepo.updateunits(0,0,1,0,0,p.getName());
            historyrepo.save(new history(p.getName(),"Camp registeration as"+" "+camp.getRole()+" with volunteer role as "+camp.getVolunteerrole()+" at "+camp.getAddress()+", "+camp.getCity()+", "+camp.getState()+" on "+new Date()));
            switch (camp.getVolunteerrole()){
                case "Take a leadership role":
                    points = 10;
                    break;
                case "Support the medical team":
                case "Fundraiser and Promotion":
                    points=8;
                    break;
                case "Manage crowd and guide them":
                case "IT Support":
                case "Be a Helpers":
                    points=5;
                    break;
                default:
                    return ResponseEntity.badRequest().body(new message("Volunteer role error.Try again"));
            }
        }else{
            return ResponseEntity.badRequest().body(new message("Incorrect role input. Try again"));
        }
        try {
            jmService.sendEmail(p.getName(),html,"Camp registeration");
        }catch (MessagingException e) {
            return ResponseEntity.ok(new message("Registeration successful, But you may not receive a confirmation email"));
        }
        userrepo.updateunits(points,0,0,0,0,p.getName());
        historyrepo.save(new history(p.getName(),"+"+points+" added for camp registeration"));
        return ResponseEntity.ok(new message("Successfully registered. A confirmation email has been sent on your email."));
    }

    @PostMapping("bloodrequest")
    public ResponseEntity<?> bloodrequest(@RequestBody bloodrequest bloodrequest,Principal p){
        System.out.println(bloodrequest.toString());
        String role = accountrepo.getrole(p.getName());
        if(role.equals("admin")){
            return ResponseEntity.badRequest().body(new message("Admin cannot make this request."));
        }
        Context context = new Context();
        user u = userrepo.findbyemail(p.getName());
        context.setVariable("name",u.getFirstname());
        context.setVariable("bloodgroup",bloodrequest.getBloodgroup());
        context.setVariable("bank",bloodrequest.getBank());
        context.setVariable("date",new Date());
        context.setVariable("location",u.getCity()+", "+u.getState());
        String html = templateEngine.process("bloodrequest", context);
        try {
            jmService.sendEmail(p.getName(),html,"Blood request successful");
        } catch (MessagingException e) {
          return   ResponseEntity.ok(new message("Blood request added. But you may not receive a confirmation email."));
        }
        historyrepo.save(new history(p.getName(),"Blood request of bloodgroup type "+bloodrequest.getBloodgroup()+" from "+bloodrequest.getBank()+ " was made on "+new Date()));
        historyrepo.save(new history(p.getName(),"+2 Points added for request"));
        userrepo.updateunits(2,0,0,0,0, p.getName());
        return ResponseEntity.ok(new message("Blood request added. A confirmation email has been sent on your email."));
    }

    @GetMapping("history")
    public ResponseEntity<?> gethistory(Principal principal){
        return ResponseEntity.ok(historyrepo.findbyemail(principal.getName()));
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deletingaccount(@RequestParam("password")String password,Principal p){
        accountrepo.deletingaccount(p.getName());
        userrepo.deletingaccount(p.getName());
        historyrepo.deletingaccounthistory(p.getName());
        return ResponseEntity.ok(new message("Deleting account."));
    }

}

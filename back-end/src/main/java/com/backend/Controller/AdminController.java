package com.backend.Controller;


import com.backend.Entity.account;
import com.backend.Entity.admin;
import com.backend.Repository.accountrepo;
import com.backend.Repository.adminrepo;
import com.backend.Request.Addrequest;
import com.backend.Response.message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/v2/")
public class AdminController {

    @Autowired
    private adminrepo adminrepo;
    @Autowired
    private accountrepo accountrepo;

    @PostMapping("add")
    public ResponseEntity<?> addadmin(@Valid @RequestBody Addrequest a, BindingResult bindingResult, Principal p){
        if(bindingResult.hasErrors()){
            System.out.println(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(new message("Incorrect input. Try again"));
        }
        admin ad = adminrepo.findbyemail(a.getUsername());
        if(ad!=null){
            return  ResponseEntity.badRequest().body(new message("Admin already exist with this Email"));
        }else{
            accountrepo.save(new account(a.getUsername(),a.getPassword(),"admin"));
            adminrepo.save(new admin(a.getFirstname(),a.getLastname(),a.getState(),a.getCity(),a.getDob(),a.getBloodgroup(),a.getUsername(),a.getPhone(),a.getGender()));

            return ResponseEntity.ok(new message("Admin added successfully. "));
        }
    }
}

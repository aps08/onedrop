package com.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user")
@NoArgsConstructor
public class user {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long iduser;
    private String email;
    private String firstname;
    private String lastname;
    private String dob;
    private String gender;
    private String bloodgroup;
    private String phone;
    private String state;
    private String city;
    private int points;
    private int request;
    private int donated;
    private int volunteered;
    private int gifts;

    public user(String email, String firstname, String lastname, String dob, String gender, String bloodgroup, String phone, int points, int request, int donated, int volunteered, int gifts,String state,String city) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.gender = gender;
        this.bloodgroup = bloodgroup;
        this.phone = phone;
        this.points = points;
        this.request = request;
        this.donated = donated;
        this.volunteered = volunteered;
        this.gifts = gifts;
        this.state = state;
        this.city = city;
    }
}

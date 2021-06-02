package com.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
public class admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idadmin;
    private String firstname;
    private String lastname;
    private String state;
    private String city;
    private String dob;
    private String gender;
    private String bloodgroup;
    private String email;
    private String phone;

    public admin(String firstname, String lastname, String state, String city, String dob, String bloodgroup, String email, String phone, String gender) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.state = state;
        this.city = city;
        this.dob = dob;
        this.bloodgroup = bloodgroup;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
    }

}

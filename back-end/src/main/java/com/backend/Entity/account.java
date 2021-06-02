package com.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "account")
@Data
@NoArgsConstructor
public class account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idaccount;
    private String email;
    private String password;
    private String role;

    public account(String username, String password, String user) {
        this.email = username;
        this.password = password;
        this.role = user;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

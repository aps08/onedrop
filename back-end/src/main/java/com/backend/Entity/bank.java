package com.backend.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "bank")
public class bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idbank;
    private String bankname;
    private String state;
    private String city;
    private int abplus;
    private int bplus;
    private int aplus;
    private int oplus;
    private int abminus;
    private int bminus;
    private int aminus;
    private int ominus;
}

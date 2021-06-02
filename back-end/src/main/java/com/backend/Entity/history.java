package com.backend.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@Table(name = "history")
@NoArgsConstructor
public class history {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idhistory;
    private String email;
    private String record;
    public history(String email, String record) {
        this.email = email;
        this.record = record;
    }
}

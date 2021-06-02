package com.backend.Response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class searchresponse {

    private String bank;
    private String bloodgroup;
    private int units;
}

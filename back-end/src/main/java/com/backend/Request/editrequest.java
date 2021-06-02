package com.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class editrequest {

    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "State name must contain only Alphabets.")
    private String state;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "City name must contain only Alphabets.")
    private String city;
    @Pattern(regexp = "^[2-9]{2}\\d{8}",message = "Phone number is always 10 digits and should not start with 0,1 or 2")
    private String phone;
    @NotBlank
    private String password;
}

package com.backend.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Addrequest {
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "First name must contain only Alphabets.")
    private String firstname;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "Last name must contain only Alphabets.")
    private String lastname;
    @Email
    private String username;
    @JsonFormat(pattern="yyyy-MM-dd")
    @NotNull
    private String dob;
    @Pattern(regexp = "^[2-9]{2}\\d{8}",message = "Phone number is always 10 digits and should not start with 0,1 or 2")
    private String phone;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "Gender must contain only Alphabets.")
    private String gender;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "State name must contain only Alphabets.")
    private String state;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "City name must contain only Alphabets.")
    private String city;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "Bloodgroup must contain only Alphabets.")
    private String bloodgroup;
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,15}$",message = "Password must contain an alphabet(Lower and Upper), a number, special character and must be more than 8 in length ")
    private String password;
}

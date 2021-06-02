package com.backend.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class camprequest {


    @Pattern(regexp = "^[a-zA-Z.,#&\\s]+$",message = "Address must contain only Alphabets and some special characters(.,#&).")
    @NotNull
    private String address;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "City name must contain only Alphabets.")
    @NotNull
    private String city;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "State name must contain only Alphabets.")
    @NotNull
    private String state;
    @JsonFormat(pattern="yyyy-MM-dd")
    @NotNull
    private String date;

    @Size(min = 1,max = 3,message = "Id cannot exceed 100.")
    @NotNull
    private String id;
    @Pattern(regexp = "^[a-zA-Z\\s]+$",message = "Role must contain only Alphabets.")
    @NotNull
    private String role;
    private String volunteerrole;
}

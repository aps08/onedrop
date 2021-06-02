package com.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class loginrequest {
    private String username;
    private String password;
}

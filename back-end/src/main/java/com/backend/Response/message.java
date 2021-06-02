package com.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class message {
    private String message;

    public message(UsernameNotFoundException e, HttpStatus notFound, String message) {
        this.message = new StringBuilder().append(e).append(message).append(notFound).toString();
    }
}

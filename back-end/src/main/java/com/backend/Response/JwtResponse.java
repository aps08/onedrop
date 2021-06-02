package com.backend.Response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {

    private String token;
    private Collection<? extends GrantedAuthority> role;

    public JwtResponse(String accessToken, Collection<? extends GrantedAuthority> role) {
        this.role = role;
        this.token = accessToken;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> role) {
        this.role = role;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }
}

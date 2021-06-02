package com.backend.Security.jwt;

import com.backend.Security.UserDetailImpl;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    private String jwtSecret= "oneDropSecretkey";

    private int jwtExpirationMs = 1000*60*60;

    public String generateJwtToken(Authentication authentication) {

        UserDetailImpl userPrincipal = (UserDetailImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setId(UUID.randomUUID().toString())
                .setAudience(String.valueOf(userPrincipal.getAuthorities()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken, HttpServletRequest httpServletRequest) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }catch (SignatureException e){
            httpServletRequest.setAttribute("Exception","Invalid Signature.");
        }catch (MalformedJwtException e) {
            httpServletRequest.setAttribute("Exception","Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            httpServletRequest.setAttribute("Exception","Expired JWT token is expired.");
        } catch (UnsupportedJwtException e) {
            httpServletRequest.setAttribute("Exception","Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            httpServletRequest.setAttribute("Exception","JWT claims string is empty.");
        }
        return false;
    }
}

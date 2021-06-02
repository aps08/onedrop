package com.backend.Service;

import com.backend.Entity.account;
import com.backend.Repository.accountrepo;
import com.backend.Security.UserDetailImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    private accountrepo accountrepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        account account = accountrepo.findbyemail(username);
        if(account==null){
            throw new UsernameNotFoundException("User Not found with email "+ username + " " + "Register yourself.");
        }
        return new UserDetailImpl(account);
    }
}

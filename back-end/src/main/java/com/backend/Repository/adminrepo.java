package com.backend.Repository;

import com.backend.Entity.admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface adminrepo extends JpaRepository<admin,Long> {

    @Query("select u from admin u where u.email= :email")
    admin findbyemail(@Param("email") String email);
}

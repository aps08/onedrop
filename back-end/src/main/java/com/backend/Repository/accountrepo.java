package com.backend.Repository;

import com.backend.Entity.account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface accountrepo extends JpaRepository<account, Long> {

    @Transactional
    @Modifying
    @Query("delete from account u where u.email= :email")
    void deletingaccount(@Param("email")String email);

    @Query("select u.role from account u where u.email= :email")
    String getrole(@Param("email") String email);

    @Query("select u from account u where u.email= :email")
    account findbyemail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("update account u set u.password= :password where u.email= :email")
    void Updatepassword(@Param("password")String password,@Param("email")String email);
}

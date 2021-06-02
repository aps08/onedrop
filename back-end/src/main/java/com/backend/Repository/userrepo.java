package com.backend.Repository;

import com.backend.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface userrepo extends JpaRepository<user,Long> {
    @Query("select u from user u where u.email= :email")
    user findbyemail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("update user u set u.state= :state,u.city= :city,u.phone= :phone where u.email= :email")
    void editUserInfo(@Param("state")String state,@Param("city")String city,@Param("phone")String phone,@Param("email")String email);

    @Transactional
    @Modifying
    @Query("delete from user u where u.email= :email")
    void deletingaccount(@Param("email")String email);

    @Transactional
    @Modifying
    @Query("update user u set u.points=u.points+ :point,u.request=u.request+ :request,u.volunteered=u.volunteered+ :volunteer,u.donated=u.donated+ :donor,u.gifts=u.gifts+ :gift where u.email= :email")
    void updateunits(@Param("point")int point,@Param("request")int request,@Param("volunteer")int volunteer,@Param("donor")int donor,@Param("gift")int gift,@Param("email")String email);
}

package com.backend.Repository;


import com.backend.Entity.history;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface historyrepo extends JpaRepository<history,Long> {
    @Query("select u.record from history u where u.email= :email")
    List<String> findbyemail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("delete from history u where u.email= :email")
    void deletingaccounthistory(@Param("email")String email);
}

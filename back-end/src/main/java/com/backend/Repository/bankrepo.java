package com.backend.Repository;

import com.backend.Entity.bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface bankrepo extends JpaRepository<bank,Long> {

    @Query("select u from bank u where u.state= :state and u.city= :city")
    bank find(@Param("state") String state, @Param("city") String city);

}

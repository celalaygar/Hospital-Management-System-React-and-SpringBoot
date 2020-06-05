package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Patient;
import com.example.demo.entity.Receipe;

public interface ReceipeRepository extends JpaRepository<Receipe, Long> {

	@Query("select p from Receipe p where p.status = 1 order by p.receipeid ASC")
	List<Receipe> findAllByStatusEquelsOne();
	
	@Query("select p from Receipe p where p.status = 1 and p.problemid=:problemid order by p.receipeid ASC")
	List<Receipe> findAllByProblemId(@Param("problemid") Long problemid);
}

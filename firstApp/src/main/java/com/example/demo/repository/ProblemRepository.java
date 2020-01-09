package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Problem;


public interface ProblemRepository extends JpaRepository<Problem, Long> {

	
	
}

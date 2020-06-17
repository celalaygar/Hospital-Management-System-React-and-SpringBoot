package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Patient;
import com.example.demo.entity.Problem;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

	@Query("select p from Problem p where p.status = 1 order by p.problemid ASC")
	List<Problem> findAllByStatusEquelsOne();
	@Query("select p from Problem p where patientid=:patientid and p.status = 1 order by p.problemid ASC")
	List<Problem> findByPatientidWithStatusOne(Long patientid);
}

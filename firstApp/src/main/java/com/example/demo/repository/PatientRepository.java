package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
	public List<Patient> findAllByOrderByPatientidAsc();

	public List<Patient> findAllByOrderByNameAsc();

	public Optional<Patient> findByEmail(String email);

	@Query("select p from Patient p where p.name like %:name%")
	List<Patient> findByName(String name);

	@Query("select p from Patient p where p.status = 1 order by p.patientid ASC")
	List<Patient> findAllByStatusEquelsOne();

	@Query("select p from Patient p where p.status = 0")
	List<Patient> findAllByStatusEquelsZero();
}

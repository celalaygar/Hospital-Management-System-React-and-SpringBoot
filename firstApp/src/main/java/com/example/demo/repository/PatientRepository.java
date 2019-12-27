package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    public List<Patient> findAllByOrderByPatientidAsc();   // I want to use some thing like this
    public List<Patient> findAllByOrderByNameAsc();   // I want to use some thing like this
}

package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Admission;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {

}

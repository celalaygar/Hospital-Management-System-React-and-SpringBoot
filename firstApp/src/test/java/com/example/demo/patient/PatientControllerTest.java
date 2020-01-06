package com.example.demo.patient;

import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;

public class PatientControllerTest {
    @Autowired
    private TestEntityManager testEntityManager;
	@Autowired
	private PatientService patientService;

	
}

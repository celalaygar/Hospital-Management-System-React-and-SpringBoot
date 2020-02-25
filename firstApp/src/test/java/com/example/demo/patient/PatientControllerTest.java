package com.example.demo.patient;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PatientControllerTest {
	@Autowired
	private PatientService patientService;

	@Test
	void savedUserHasRegistrationDate() {
		Patient patient = new Patient("zaphod", "zupada", "Male", "44", "ANKARA", "zaphod@yahoo.com", 1);
		Boolean control = patientService.save(patient);
		assertThat(control).isNotEqualTo(false);
	}

}

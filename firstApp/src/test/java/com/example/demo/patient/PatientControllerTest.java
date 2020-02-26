package com.example.demo.patient;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.demo.controller.PatientController;
import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;

@ExtendWith(SpringExtension.class)
//@SpringBootTest
//@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PatientControllerTest {
	@InjectMocks
	PatientController patientController;

	@Autowired
	private PatientService patientService;

	@Test
	public void savePatientV1() {
//		Patient p1 = new Patient("zipato", "zazula", "Male", "44", "ANKARA", "zipato@gmail.com", 1);
//		MockHttpServletRequest request = new MockHttpServletRequest();
//		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
//		//when(patientService.save((any(Patient.class))).thenReturn(true);
//		ResponseEntity<Patient> responseEntity = patientController.savePatient(p1);
//		assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);
//      assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}

	@Test
	void savePatientV2() {
		Patient p1 = new Patient("kamara", "tamara", "Female", "44", "ANKARA", "kamara.tamara@mynet.com", 1);
		Patient p2 = patientService.save(p1);
		assertThat(p2.getPatientid()).isNotNull();

		//assertThat(control).isNotEqualTo(false);
	}

}

package com.example.demo.patient;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.assertj.core.util.Arrays;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.demo.controller.PatientController;
import com.example.demo.dto.PatientDto;
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

	private RestTemplate restTemplate;

	private ResponseEntity<Patient> response;

	@Test
	public void testGetAllPatientWithStatusOne() throws URISyntaxException {
		restTemplate = new RestTemplate();
		String baseUrl = "http://localhost:8185/patient";
		URI uri = new URI(baseUrl);
		ResponseEntity<Object> result = restTemplate.getForEntity(baseUrl, Object.class);
		// List<PatientDto>
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void savePatientV1() {
		try {
			Patient p1 = new Patient("zipato", "zazula", "Male", "44", "ANKARA", "zipato@gmail.com", 1);
			String addURI = "http://localhost:8185/patient";
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Accept", "application/json");
			headers.add("Content-Type", "application/json"); 
			HttpEntity<Patient> entity = new HttpEntity<Patient>(p1, headers); 
			
			response = this.restTemplate.postForEntity(addURI, p1, Patient.class);
			// responseBody = response.getBody().toString();
			assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	void savePatientV2() {
		Patient p1 = new Patient("kamara", "tamara", "Female", "44", "ANKARA", "kamara.tamara@mynet.com", 1);
		Patient p2 = patientService.save(p1);
		assertThat(p2.getPatientid()).isNotNull();
	}

}

package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PatientDto;
import com.example.demo.dto.PatientSingleDto;
import com.example.demo.entity.City;
import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/patient")
public class PatientController {

	@Autowired
	private PatientService patientService;

	@GetMapping
	public List<PatientDto> getAll() throws Exception {
		return patientService.findAll();
	}

	@GetMapping("/find-by-id/{patientid}")
	public ResponseEntity<PatientSingleDto> getPatientByPatientid(
			@PathVariable(name = "patientid", required = true) Long patientid) throws Exception {
		return ResponseEntity.ok(patientService.findByPatientId(patientid));
	}

	@GetMapping("/find-by-email/{email}")
	public ResponseEntity<Patient> getPatientByEmail(@PathVariable(name = "email", required = true) String email)
			throws Exception {
		return ResponseEntity.ok(patientService.findByEmail(email));
	}

	@GetMapping("/find-by-name/{name}")
	public ResponseEntity<List<Patient>> getPatientByName(@PathVariable(name = "name", required = true) String name)
			throws Exception {
		return ResponseEntity.ok(patientService.findByName(name));
	}

	@PostMapping
	public ResponseEntity<Patient> savePatient(@Valid @RequestBody Patient patient) {
		return ResponseEntity.ok(patientService.save(patient));
	}

	@PutMapping("/{patientid}")
	public ResponseEntity<Boolean> updatePatient(@PathVariable(name = "patientid", required = true) Long patientid,
			@Valid @RequestBody Patient patient) throws Exception {
		return ResponseEntity.ok(patientService.update(patientid, patient));
	}

	@DeleteMapping("/{patientid}")
	public ResponseEntity<Boolean> deletePatient(@PathVariable(name = "patientid", required = true) Long patientid)
			throws Exception {
		return ResponseEntity.ok(patientService.delete(patientid));
	}

	@GetMapping("/deleted-patients")
	public ResponseEntity<List<PatientDto>> getAllDeletedPatients() throws Exception {
		return ResponseEntity.ok(patientService.findAllDeletedPatients());
	}

	@GetMapping("/cities")
	public ResponseEntity<List<City>> getAllBookStatus() {
		return ResponseEntity.ok(Arrays.asList(City.values()));
	}
}

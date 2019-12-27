package com.example.demo.controller;

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

import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/patient")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@GetMapping
	public List<Patient> getAll(){
		return patientService.findAll();
	}

	@GetMapping("/{patientid}")
	public ResponseEntity<Patient> getPatient(@PathVariable(name = "patientid", required = true) Long patientid) throws Exception {
		return ResponseEntity.ok(patientService.findByPatientId(patientid));
	}
	@PostMapping
	public ResponseEntity<Boolean> savePatient(@Valid @RequestBody Patient patient) {
		return ResponseEntity.ok(patientService.save(patient));
	}
	@PutMapping("/{patientid}")
	public ResponseEntity<Boolean> updatePatient(
			@PathVariable(name = "patientid", required = true) Long patientid,
			@Valid @RequestBody Patient patient) throws Exception {
		return ResponseEntity.ok(patientService.update(patientid,patient));
	}
	
	@DeleteMapping("/{patientid}")
	public ResponseEntity<Boolean> deletePatient(@PathVariable(name = "patientid", required = true) Long patientid) {
		return ResponseEntity.ok(patientService.delete(patientid));
	}
}

package com.example.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProblemDto;
import com.example.demo.entity.Patient;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.service.ProblemService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/patient/problem")
public class ProblemController {

	@Autowired
	ProblemService problemService;
	
	@GetMapping("/find-by-id/{patientid}")
	public ResponseEntity<Patient> getPatientByPatientid(
			@PathVariable(name = "patientid", required = true) Long patientid) throws Exception {
		return ResponseEntity.ok(null);
	}
	
	@PostMapping
	public ResponseEntity<Boolean> saveProblem(@Valid @RequestBody ProblemDto dto) throws NotFoundException {
		return ResponseEntity.ok(problemService.save(dto));
	}
}

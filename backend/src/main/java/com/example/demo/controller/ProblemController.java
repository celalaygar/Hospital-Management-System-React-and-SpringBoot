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

import com.example.demo.dto.ProblemDto;
import com.example.demo.dto.ProblemDtoForPatientSingleDto;
import com.example.demo.dto.ProblemGetDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.enums.City;
import com.example.demo.entity.enums.ProblemStatus;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.service.ProblemService;
import com.example.demo.util.ApiPaths;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(ApiPaths.ProblemCtrl.CTRL)
public class ProblemController {

	@Autowired
	ProblemService problemService;

	@GetMapping("/find-by-problemid/{problemid}")
	public ResponseEntity<ProblemGetDto> getProblem(@PathVariable(name = "problemid", required = true) Long problemid)
			throws NotFoundException {
		return ResponseEntity.ok(problemService.findByProblemid(problemid));
	}

	@GetMapping("/find-all-by-patientid/{patientid}")
	public ResponseEntity<List<ProblemDtoForPatientSingleDto>> getAllProblem(@PathVariable(name = "patientid", required = true) Long patientid)
			throws NotFoundException {
		return ResponseEntity.ok(problemService.findAllByPatientid(patientid));
	}
	@PostMapping
	public ResponseEntity<ProblemDtoForPatientSingleDto> saveProblem(@Valid @RequestBody ProblemDto dto)
			throws NotFoundException {
		return ResponseEntity.ok(problemService.save(dto));
	}

	@PutMapping("/{problemid}")
	public ResponseEntity<Boolean> updateProblem(@PathVariable(name = "problemid", required = true) Long problemid,
			@Valid @RequestBody ProblemDtoForPatientSingleDto dto) throws Exception {
		return ResponseEntity.ok(problemService.update(problemid, dto));
	}

	@DeleteMapping("/{problemid}")
	public ResponseEntity<Boolean> deleteProblem(@PathVariable(name = "problemid", required = true) Long problemid)
			throws Exception {
		return ResponseEntity.ok(problemService.delete(problemid));
	}

	@GetMapping("/status")
	public ResponseEntity<List<ProblemStatus>> getAllBookStatus() {
		return ResponseEntity.ok(Arrays.asList(ProblemStatus.values()));
	}
}

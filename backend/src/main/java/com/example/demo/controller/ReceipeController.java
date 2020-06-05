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
import com.example.demo.dto.ReceipeDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.enums.City;
import com.example.demo.entity.enums.ProblemStatus;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.service.ProblemService;
import com.example.demo.service.ReceipeService;
import com.example.demo.util.ApiPaths;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(ApiPaths.ReceipeCtrl.CTRL)
public class ReceipeController {

	@Autowired
	ProblemService problemService;
	
	@Autowired
	ReceipeService receipeService;

	@GetMapping("/find-all-by-problemid/{problemid}")
	public ResponseEntity<List<ReceipeDto>> getReceipe(@PathVariable(name = "problemid", required = true) Long problemid) throws Exception {
		return ResponseEntity.ok(receipeService.findAllByProblemId(problemid));
	}

	@PostMapping
	public ResponseEntity<ReceipeDto> saveReceipe(@Valid @RequestBody ReceipeDto dto) throws NotFoundException {
		return ResponseEntity.ok(receipeService.save(dto));
	}

//	@PutMapping("/{receipeid}")
//	public ResponseEntity<Boolean> updateReceipe(@PathVariable(name = "receipeid", required = true) Long problemid,
//			@Valid @RequestBody ProblemDtoForPatientSingleDto dto) throws Exception {
//		return ResponseEntity.ok(problemService.update(problemid, dto));
//	}

	@DeleteMapping("/{receipeid}")
	public ResponseEntity<Boolean> deleteReceipe(@PathVariable(name = "receipeid", required = true) Long receipeid) throws Exception {
		return ResponseEntity.ok(receipeService.delete(receipeid));
	}

}

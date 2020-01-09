package com.example.demo.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProblemDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Problem;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.ProblemRepository;

import javassist.NotFoundException;

@Service
public class ProblemService {

	private final ProblemRepository problemRepository;
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	public ProblemService( ProblemRepository problemRepository, PatientRepository patientRepository,ModelMapper modelMapper) {
		this.patientRepository = patientRepository;
		this.problemRepository = problemRepository;
		this.modelMapper = modelMapper;
	}
	
	public Boolean save(ProblemDto dto) throws NotFoundException {
		Optional<Patient> patient = patientRepository.findById(dto.getPId());
		if (!patient.isPresent()){
			throw new NotFoundException("Patient does not exist wtih patientid : " + dto.getPId());
		}
		Problem problem = modelMapper.map(dto, Problem.class);
		problem.setPatient(patient.get());
		problemRepository.save(problem);
		
		problemRepository.findAll().forEach(System.out::println);
		return true;
	}
	
}

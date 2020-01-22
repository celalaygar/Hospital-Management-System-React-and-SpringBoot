package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProblemDto;
import com.example.demo.dto.ProblemDtoForPatientSingleDto;
import com.example.demo.dto.ProblemGetDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Problem;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.ProblemRepository;

import javassist.NotFoundException;

@Service
public class ProblemService {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private final ProblemRepository problemRepository;
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	public ProblemService( ProblemRepository problemRepository, PatientRepository patientRepository,ModelMapper modelMapper) {
		this.patientRepository = patientRepository;
		this.problemRepository = problemRepository;
		this.modelMapper = modelMapper;
	}
	
	public ProblemDtoForPatientSingleDto save(ProblemDto dto) throws NotFoundException {
		Optional<Patient> patient = patientRepository.findById(dto.getPId());
		if (!patient.isPresent()){
			throw new NotFoundException("Patient does already exist wtih patientid : " + dto.getPId());
		}
		
		Problem problem = modelMapper.map(dto, Problem.class);
		problem.setPatient(patient.get());
		problemRepository.save(problem);
		
		ProblemDtoForPatientSingleDto getDto = modelMapper.map(problem, ProblemDtoForPatientSingleDto.class);
		return getDto;
	}

	public Boolean delete(Long problemid) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()){
			throw new NotFoundException("Problem does not exist wtih problemid : " + problemid);
		}
		
		problemRepository.delete(optional.get());
		return true;
	}

	public ProblemGetDto findByProblemid(Long problemid) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()){
			throw new NotFoundException("Problem does not exist wtih problemid : " + problemid);
		}
		ProblemGetDto dto = modelMapper.map(optional.get(), ProblemGetDto.class);
		return dto;
	}

	public Boolean update(Long problemid, @Valid ProblemDtoForPatientSingleDto dto) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()){
			throw new NotFoundException("Problem does not exist wtih problemid : " + problemid);
		}
		return true;
	}
	
}

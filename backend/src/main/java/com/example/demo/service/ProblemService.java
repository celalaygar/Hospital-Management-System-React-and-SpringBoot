package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger; 
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProblemDto;
import com.example.demo.dto.ProblemDtoForPatientSingleDto;
import com.example.demo.dto.ProblemGetDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Problem;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.ProblemRepository;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import javassist.NotFoundException;

@Service
public class ProblemService {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private final ProblemRepository problemRepository;
	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;  
	private final Logger logger;

	public ProblemService(ProblemRepository problemRepository, PatientRepository patientRepository,
			ModelMapper modelMapper, Logger logger) {
		this.patientRepository = patientRepository;
		this.problemRepository = problemRepository;
		this.modelMapper = modelMapper;
		this.logger = logger;
	}

	public ProblemDtoForPatientSingleDto save(ProblemDto dto) throws NotFoundException {
		Optional<Patient> patient = patientRepository.findById(dto.getPId());
		if (!patient.isPresent()) {
			logger.error("Patient does already exist wtih patientid : " + dto.getPId());
			throw new NotFoundException("Patient does already exist with patientid : " + dto.getPId());
		}
		Problem problem = modelMapper.map(dto, Problem.class);
		problem.setPatient(patient.get());
		problem.setPatientid(patient.get().getPatientid());
		problemRepository.save(problem);
		ProblemDtoForPatientSingleDto getDto = modelMapper.map(problem, ProblemDtoForPatientSingleDto.class);
		return getDto;
	}

	public Boolean delete(Long problemid) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()) {
			logger.error("Problem does not exist wtih problemid : " + problemid);
			throw new NotFoundException("Problem does not exist with problemid : " + problemid);
		}
		optional.get().setStatus(0);
		problemRepository.save(optional.get());
		// problemRepository.delete(optional.get());
		return true;
	}

	public ProblemGetDto findByProblemid(Long problemid) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()) {
			logger.error("Problem does not exist wtih problemid : " + problemid);
			throw new NotFoundException("Problem does not exist with problemid : " + problemid);
		}
		ProblemGetDto dto = modelMapper.map(optional.get(), ProblemGetDto.class);
		return dto;
	}

	public Boolean update(Long problemid, @Valid ProblemDtoForPatientSingleDto dto) throws NotFoundException {
		Optional<Problem> optional = problemRepository.findById(problemid);
		if (!optional.isPresent()) {
			logger.error("Problem does not exist wtih problemid : " + problemid);
			throw new NotFoundException("Problem does not exist with problemid : " + problemid);
		}
		return true;
	}

	public List<ProblemDtoForPatientSingleDto> findAllByPatientid(Long patientid) throws NotFoundException {
		List<Problem> list = problemRepository.findByPatientidWithStatusOne(patientid);
		if(list.size()>0) {
			
			return Arrays.asList(modelMapper.map(list, ProblemDtoForPatientSingleDto[].class));
		}
		logger.error("Problem does not exist wtih patientid : " + patientid);
		throw new NotFoundException("Problem does not exist with patientid : " + patientid);
	}

}

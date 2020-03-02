package com.example.demo.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PatientDto;
import com.example.demo.dto.PatientSingleDto;
import com.example.demo.entity.Patient;
import com.example.demo.exception.PatientNotFoundException;
import com.example.demo.repository.PatientRepository;

import javassist.NotFoundException;

@Service
public class PatientService {

	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	private final Logger logger;

	public PatientService(PatientRepository patientRepository, ModelMapper modelMapper, Logger logger) {
		this.patientRepository = patientRepository;
		this.modelMapper = modelMapper;
		this.logger = logger;
	}

	public List<PatientDto> findAll() throws Exception {
		try { 
			// List<Patient> patients = patientRepository.findAllByOrderByPatientidAsc();
			List<Patient> patients = patientRepository.findAllByStatusEquelsOne();
			if (patients.size() < 1) {
				logger.error("There is never patients ");
				throw new PatientNotFoundException("There is never patient ");
			}
			PatientDto[] authorDtos = modelMapper.map(patients, PatientDto[].class); 
			return Arrays.asList(authorDtos);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	public List<PatientDto> findAllDeletedPatients() { 
		List<Patient> patients = patientRepository.findAllByStatusEquelsZero(); 
		if (patients.size() > 0) { 
			PatientDto[] authorDtos = modelMapper.map(patients, PatientDto[].class);
			return Arrays.asList(authorDtos);
		} else {
			logger.error("There is no deleted patient ");
			throw new PatientNotFoundException("There is no deleted patient "); 
		}
	}

	public Patient save(Patient patient) {
		patient.setStatus(1);
		patient = patientRepository.save(patient);
		if (patient.getPatientid() > -1)
			return patient;
		else{
			throw new PatientNotFoundException("A problem occurred during saving patient" );
		}
	}

	public Boolean delete(@Valid Long patientid) throws Exception {
		Optional<Patient> optPatient = patientRepository.findById(patientid);
		if (optPatient.isPresent()) { 
			optPatient.get().setStatus(0);
			optPatient.get().getProblems().forEach(p -> {
				p.setStatus(0);
			});
			patientRepository.save(optPatient.get());
			// patientRepository.delete(optpatient.get());
			return true;
		} else {
			logger.error("--Patient does not exist with this id " + patientid);
			throw new PatientNotFoundException("Patient does not exist with this id " + patientid); 
		}
	}

	public PatientSingleDto findByPatientId(Long patientid) throws Exception {
		Optional<Patient> optPatient = patientRepository.findById(patientid);
		if (optPatient.isPresent()) { 
			optPatient.get().getProblems().removeIf(problem -> problem.getStatus() == 0);
			PatientSingleDto dto = modelMapper.map(optPatient.get(), PatientSingleDto.class); 
			return dto;
		} else { 
			logger.error("--Patient does not exist with this id " + patientid);
			throw new PatientNotFoundException("Patient does not exist with this id " + patientid);
		}
	}

	public Patient findByEmail(String email) throws Exception {
		Optional<Patient> patient = patientRepository.findByEmail(email);
		if (patient.isPresent()) 
			return patient.get();
		else { 
			logger.error("--Patient does not exist with this email " + email);
			throw new PatientNotFoundException("Patient does not exist with this email " + email);
		}
	}

	public Boolean update(Long patientid, @Valid Patient patient) throws Exception {
		Optional<Patient> p = patientRepository.findById(patientid);
		if (p.isPresent()) { 
			patient.setPatientid(patientid);
			patientRepository.save(patient); 
			return true;
		} else {
			logger.error("--Patient does not exist with this id " + patientid);
			throw new PatientNotFoundException("Patient does not exist with this id " + patientid);
		}
	}

	public List<Patient> findByName(String name) throws Exception { 
		List<Patient> patients = patientRepository.findByName(name);
		if (patients.size() > 0) { 
			return patients;
		} else { 
			logger.error("--Patient does not exist with this name " + name);
			throw new PatientNotFoundException("Patient does not exist with this name " + name);
		}
	}

}

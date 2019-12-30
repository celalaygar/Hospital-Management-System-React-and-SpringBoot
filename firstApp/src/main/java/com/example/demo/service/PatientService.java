package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Patient;
import com.example.demo.repository.PatientRepository;

@Service
public class PatientService {

	private final PatientRepository patientRepository;
	private final ModelMapper modelMapper;
	public PatientService(PatientRepository patientRepository,ModelMapper modelMapper) {
		this.patientRepository = patientRepository;
		this.modelMapper = modelMapper;
	}

	public List<Patient> findAll() {

		return patientRepository.findAllByOrderByPatientidAsc();
	}

	public Boolean save(Patient patient) {

		System.out.println(patient);
		patient = patientRepository.save(patient);
		if (patient.getPatientid() > -1)
			return true;
		else
			return false;
	}

	public Boolean delete(@Valid Long id) {
		Patient patient = patientRepository.getOne(id);
		System.out.println(patient);
		patientRepository.delete(patient);
		return true;
	}

	public Patient findByPatientId(Long patientid) throws Exception {
		Optional<Patient> patient = patientRepository.findById(patientid);
		if (patient.isPresent())
			return patient.get();
		else
			throw new Exception("Getting Patient is not ok with : " + patientid);
	}

	public Boolean update(Long patientid, @Valid Patient patient) throws Exception {
		Optional<Patient> p = patientRepository.findById(patientid);
		if (p.isPresent()) {
			patient.setPatientid(patientid);
			patientRepository.save(patient);
			return true;
		}
		else
			throw new Exception("Getting Patient is not ok with : " + patientid);
		
	}

}

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
		patient = patientRepository.save(patient);
		if (patient.getPatientid() > -1)
			return true;
		else
			return false;
	}

	public Boolean delete(@Valid Long patientid) throws Exception {
		Optional<Patient> patient = patientRepository.findById(patientid);
		if (patient.isPresent()){
			patientRepository.delete(patient.get());
			return true;
		}
		else
			throw new Exception("Getting Patient is not ok with : " + patientid);

	}

	public Patient findByPatientId(Long patientid) throws Exception {
		Optional<Patient> patient = patientRepository.findById(patientid);
		if (patient.isPresent())
			return patient.get();
		else
			throw new Exception("Getting Patient is not ok with : " + patientid);
	}

	public Patient findByEmail(String email) throws Exception {
		Optional<Patient> patient = patientRepository.findByEmail(email);
		if (patient.isPresent())
			return patient.get();
		else
			throw new Exception("Getting Patient is not ok with : " + email);
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

	public List<Patient> findByName(String name) throws Exception {
		System.out.println("name : "+name);
		List<Patient> patients = patientRepository.findByName(name);
		if (patients.size()>0) {
			return patients;
		}
		else
			throw new Exception("Getting Patients is not ok with : " + name);
	}


}

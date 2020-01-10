package com.example.demo.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.example.demo.entity.Patient;
import com.example.demo.entity.Problem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatientDto implements Serializable {
	private Long patientid;
	private String name;
	private String lastname;
	private String gender;
	private String age;
	private String city;
	private String email;
	private int status;
	
	private List<ProblemDtoForPatientSingleDto> problems;
}

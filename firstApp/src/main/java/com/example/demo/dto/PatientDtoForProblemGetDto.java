package com.example.demo.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatientDtoForProblemGetDto implements Serializable {
	private Long patientid;
	private String name;
	private String lastname;
	private String gender;
	private String age;
	private String city;
	private String email;
	private int status;
	
}

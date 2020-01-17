package com.example.demo.dto;

import java.io.Serializable;

import com.example.demo.entity.Patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProblemGetDto implements Serializable {
	private Long problemid;
	private String problemName;
	private String problemDetail;
	private Long pId;
	private PatientDtoForProblemGetDto patient;
}

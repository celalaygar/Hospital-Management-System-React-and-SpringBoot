package com.example.demo.exception;

import java.util.Date;

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
public class ExceptionResponse {
	private Date date;
	private String message;
}

package com.example.demo.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@RestControllerAdvice
public class IMExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(PatientNotFoundException.class)
	public final ResponseEntity<?> handlePatientNotFoundException(Exception ex, WebRequest request) {
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage());
		//logger.error("--Application was Error : "+ex.getMessage());
		return new ResponseEntity<>(exceptionResponse, HttpStatus.EXPECTATION_FAILED); 
	}
}

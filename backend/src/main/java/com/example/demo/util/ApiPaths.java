package com.example.demo.util;

public class ApiPaths {
	private static final String BASE_PATH = "/api";
	private static final String PATIENT_PATH = "/patient";
	private static final String PROBLEM_PATH = "/problem";
	public static final class PatientCtrl {
		public static final String CTRL = BASE_PATH +  "/patient";
	}

	public static final class ProblemCtrl {
		public static final String CTRL = BASE_PATH + PATIENT_PATH + PROBLEM_PATH;
	}
}

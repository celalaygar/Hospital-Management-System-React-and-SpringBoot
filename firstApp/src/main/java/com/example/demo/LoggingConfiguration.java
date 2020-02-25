package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InjectionPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class LoggingConfiguration {
	@Bean
	@Scope("prototype")
	Logger logger(InjectionPoint injectionPoint){
	    return LoggerFactory.getLogger(injectionPoint.getMethodParameter().getContainingClass());

	}
}

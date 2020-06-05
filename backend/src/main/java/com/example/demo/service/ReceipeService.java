package com.example.demo.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PatientDto;
import com.example.demo.dto.ReceipeDto;
import com.example.demo.entity.Problem;
import com.example.demo.entity.Receipe;
import com.example.demo.exception.PatientNotFoundException;
import com.example.demo.repository.ProblemRepository;
import com.example.demo.repository.ReceipeRepository;

import javassist.NotFoundException;

@Service
public class ReceipeService {
	private final ReceipeRepository receipeRepository;
	private final ModelMapper modelMapper;
	private final Logger logger;
	private final ProblemRepository problemRepository;

	public ReceipeService(ReceipeRepository receipeRepository, ModelMapper modelMapper, Logger logger,
			ProblemRepository problemRepository) {
		this.receipeRepository = receipeRepository;
		this.modelMapper = modelMapper;
		this.logger = logger;
		this.problemRepository = problemRepository;
	}

	public List<ReceipeDto> getAll() throws Exception {
		try {
			List<Receipe> list = receipeRepository.findAllByStatusEquelsOne();
			if (list.size() > 0) {
				ReceipeDto[] dtos = modelMapper.map(list, ReceipeDto[].class);
				return Arrays.asList(dtos);
			} else {
				logger.error("there is no any receipe");
				throw new PatientNotFoundException("there is no any receipe");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	public void findByreceipeId() {

	}

	public List<ReceipeDto> findAllByProblemId(Long problemid) throws Exception {
		try {
			List<Receipe> list = receipeRepository.findAllByProblemId(problemid);
			if (list.size() > 0) {
				ReceipeDto[] dtos = modelMapper.map(list, ReceipeDto[].class);
				return Arrays.asList(dtos);
			} else {
				logger.info("This problem has no any receipe");
				throw new PatientNotFoundException("This problem has no any receipe");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	public ReceipeDto save(ReceipeDto dto) throws NotFoundException {
		Optional<Problem> opt = problemRepository.findById(dto.getProblemid());
		if (opt.isPresent()) {
			dto.setStatus(1);
			Receipe receipe = modelMapper.map(dto, Receipe.class);
			receipe.setProblem(opt.get());
			receipe = receipeRepository.save(receipe);
			if (receipe.getReceipeid() > -1) {
				dto.setReceipeid(receipe.getReceipeid());
				logger.info("Perfect.. Receipe for related problem is ok");
				return dto;
			} else {
				logger.error("A problem occurred during saving receipe");
				throw new PatientNotFoundException("A problem occurred during saving receipe");
			}
		} else {
			logger.error("There is no such problem with problem id : " + dto.getProblemid());
			throw new NotFoundException("There is no such problem with problem id : " + dto.getProblemid());
		}

	}

	public boolean delete(Long receipeid) throws NotFoundException {
		Optional<Receipe> optional = receipeRepository.findById(receipeid);
		if (!optional.isPresent()) {
			logger.error("Receipe does not exist wtih receipeid : " + receipeid);
			throw new NotFoundException("Receipe does not exist with receipeid : " + receipeid);
		}
		optional.get().setStatus(0);
		receipeRepository.save(optional.get());
		return true;
	}
}

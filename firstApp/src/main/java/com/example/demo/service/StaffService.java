package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StaffDto;
import com.example.demo.entity.Staff;
import com.example.demo.exception.PatientNotFoundException;
import com.example.demo.repository.StaffRepository;

import javassist.NotFoundException;

@Service
public class StaffService {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private final ModelMapper modelMapper;
	private final Logger logger;
	private final StaffRepository staffRepository;

	public StaffService(StaffRepository staffRepository, ModelMapper modelMapper, Logger logger) {
		this.staffRepository = staffRepository;
		this.modelMapper = modelMapper;
		this.logger = logger;
	}
	public StaffDto save(Staff staff) throws Exception {
		try {
			staff.setCreatedDate(new Date());
			staff.setStatus(1);
			staff = staffRepository.save(staff);
			if (staff.getStaffid() > -1) {
				StaffDto staffDto = modelMapper.map(staff, StaffDto.class);
				return staffDto;
			} else {
				logger.error("--Staff can not exist");
				throw new Exception("Staff can not exist");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	public List<StaffDto> getAll() throws NotFoundException {
		List<Staff> staffs = staffRepository.findAllByStatusEquelsOne();
		if (staffs.size() > 0) {
			StaffDto[] staffDtos = modelMapper.map(staffs, StaffDto[].class);
			return Arrays.asList(staffDtos);
		} else {
			logger.error("--There is never Staff");
			throw new NotFoundException("There is never Staff");
		}
	}
	public List<StaffDto> getAllDeletedStaff() throws NotFoundException {
		List<Staff> staffs = staffRepository.findAllByStatusEquelsZero();
		if (staffs.size() > 0) {
			StaffDto[] staffDtos = modelMapper.map(staffs, StaffDto[].class);
			return Arrays.asList(staffDtos);
		} else {
			logger.error("--There is never deleted Staff");
			throw new NotFoundException("There is never deleted Staff");
		}
	}
	public Boolean delete(@Valid Long staffid) throws Exception {
		Optional<Staff> optional = staffRepository.findById(staffid);
		if (optional.isPresent()) {
			optional.get().setStatus(0);
			staffRepository.save(optional.get());
			return true;
		} else {
			logger.error("--Staff does not exist with this id " + staffid);
			throw new Exception("Staff does not exist with this id " + staffid);
		}
	}

}
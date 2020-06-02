package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StaffDto;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Staff;
import com.example.demo.entity.enums.City;
import com.example.demo.entity.enums.Department;
import com.example.demo.service.StaffService;

import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/staff")
public class StaffController {
	private final StaffService staffService;
	
	
	public StaffController(StaffService staffService) {
		this.staffService = staffService;
	}
	// headers = "Accept=application/json",
	//@RequestMapping(method = RequestMethod.GET, produces = "application/json")
	@GetMapping
	public ResponseEntity<List<StaffDto>> getAllStaff() throws NotFoundException {
		return ResponseEntity.ok(staffService.getAll());
	}
	
	@RequestMapping(value = "/deleted-staff",method = RequestMethod.GET, produces = "application/json")
	//@GetMapping("/deleted-staff")
	public ResponseEntity<List<StaffDto>> getAllDeletedStaff() throws NotFoundException {
		return ResponseEntity.ok(staffService.getAllDeletedStaff());
	}
	
	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<StaffDto> savePatient(@Valid @RequestBody Staff staff) throws Exception {
		return ResponseEntity.ok(staffService.save(staff));
	}
	
	@DeleteMapping("/{staffid}")
	public ResponseEntity<Boolean> deletePatient(@PathVariable(name = "staffid", required = true) Long staffid)
			throws Exception {
		return ResponseEntity.ok(staffService.delete(staffid));
	}
	
	@GetMapping("/cities")
	public ResponseEntity<List<City>> getAllCities() {
		return ResponseEntity.ok(Arrays.asList(City.values()));
	}
	
	@GetMapping("/department")
	public ResponseEntity<List<Department>> getAllDepertman() {
		return ResponseEntity.ok(Arrays.asList(Department.values()));
	}
}

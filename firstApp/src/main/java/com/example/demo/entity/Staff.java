package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.example.demo.entity.enums.City;
import com.example.demo.entity.enums.Department;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "aastaff")
public class Staff {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AA_PATIENT_SEQ")
	@SequenceGenerator(sequenceName = "AA_PATIENT_SEQ", allocationSize = 1, name = "AA_PATIENT_SEQ")
	@Column(name = "staffid")
	private Long staffid;
	private String staffname;
	private String stafflastname;
	private String gender;

	
	@Column(name = "email", unique = true)
	private String email;
	@Enumerated(EnumType.ORDINAL)
	private City city;
	
	@Column(name = "department", length = 100)
	@Enumerated(EnumType.ORDINAL)
	private Department department;
	
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date bornDate;
    
	@OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Admission> admissions;
	
	private int status;
}

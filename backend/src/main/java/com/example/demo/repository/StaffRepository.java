package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
	@Query("select s from Staff s where s.status = 1 order by s.staffid ASC")
	List<Staff> findAllByStatusEquelsOne();
	@Query("select s from Staff s where s.status = 0 order by s.staffid ASC")
	List<Staff> findAllByStatusEquelsZero();
}

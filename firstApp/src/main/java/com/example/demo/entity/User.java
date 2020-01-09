package com.example.demo.entity;
import javax.persistence.*;

import lombok.Data;
import javax.persistence.*;


@Data
@Entity
@Table(name="aauser")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AA_PATIENT_SEQ")
    @SequenceGenerator(sequenceName = "AA_PATIENT_SEQ", allocationSize = 1, name = "AA_PATIENT_SEQ")
	@Column(name = "userid")
    private Long userid;

    @Column(name="name")
    private String name;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private Role role;

	//Not persistent. There is no column on database table.
    @Transient
    private String token;
}

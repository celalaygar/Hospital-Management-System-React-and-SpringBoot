# Patient-SpringBoot-React

This Project is building....

## Using Tools & Technologies
``` 
- Spring Boot 2.2.2
- REST API (get, post, put, delete, patch)
- ModelMapper, DTO
- JPA, Hibernate
- React
- Bootstrap 4
- Oracle
```
## Sql Query
```
CREATE TABLE "AVC237"."AAPATIENT" 
   (	
    "PATIENTID" NUMBER(19,0) NOT NULL ENABLE, 
	"NAME" VARCHAR2(255 CHAR), 
	"LASTNAME" VARCHAR2(255 CHAR), 
	"AGE" VARCHAR2(255 CHAR), 
	"GENDER" VARCHAR2(255 CHAR), 
	"CITY" VARCHAR2(255 CHAR), 
	"STATUS" NUMBER(10,0), 
	"EMAIL" VARCHAR2(255 CHAR), 
	 PRIMARY KEY ("PATIENTID")
	);
		 
   CREATE SEQUENCE AA_PATIENT_SEQ START WITH 1 INCREMENT BY 1

```
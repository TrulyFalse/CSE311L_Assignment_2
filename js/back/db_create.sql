/* After launching mysql on XAMPP, run this code in the SQL query section to create the database */

CREATE DATABASE cse311l_assignment2_db;

CREATE TABLE profile(
    profile_ID int AUTO_INCREMENT,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    gender varchar(7) NOT NULL,
    dob DATE NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    pfp MEDIUMBLOB,

    PRIMARY KEY(profile_ID)
)



/*

POST: /api/profile  (for creating profile)
----------------------
INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)
VALUES ('${profile.first_name}', '${profile.last_name}', '${profile.gender}', '${profile.dob}', '${profile.email}', '${profile.password}', '${profile.pfp}');


POST: /api/login     (for logging into existing profile)
-----------------------
SELECT *
FROM profile p
WHERE p.email = "${login.email}" AND p.password = "${login.password}";


GET: /api/profile   (for retrieving logged profile info)
-----------------------
SELECT p.first_name, p.last_name, p.gender, p.dob, p.email
FROM profile p
WHERE p.email = "${email}"


PUT: /api/profile   (for updating a profile logged into)
----------------------------
UPDATE profile
SET first_name = '${profile.first_name}', 
last_name = '${profile.last_name}', 
gender = '${profile.gender}', 
dob = '${profile.dob}', 
email = '${profile.email}', 
pfp = '${profile.pfp}'
WHERE email = '${profile.old_email}';


DELETE: /api/profile    (for removing a profile logged into)
---------------------------
DELETE FROM profile
WHERE email = '${req.body.email}';


*/
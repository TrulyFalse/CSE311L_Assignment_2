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

/add-profile query
----------------------
`INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)
VALUES ('${profile.first_name}', '${profile.last_name}', '${profile.gender}', '${profile.dob}', '${profile.email}', '${profile.password}', '${profile.pfp}');`;

*/
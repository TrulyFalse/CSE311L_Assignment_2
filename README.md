# CSE311L_Assignment_2
Creating a full-fledged CRUD (Create, Read, Update, Delete) REST API using Express.js and a dynamic profile page in the frontend.

# Setup
1. Copy the code from db_create.sql and run it on XAMPP's MySQL admin page.
2. Start the server by running app.js using the terminal. Type in the terminal while in the file's directory: "node app.js"
3. The canvas .zip file contains the node_modules folder but the github repository doesn't. So to install all dependencies from the package.json file, just type "npm install" while in the "back" subfolder directory.

# Structure
The project is built using :
Database:              MySQL
Backend Framework:     Express JS
Frontend Library:      [none]
Backend Runtime Env.:  Node.JS

# API documentation
Registration (POST /api/register): Endpoint to create a new user.
Query sent to DB:
INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)
VALUES ('${profile.first_name}', '${profile.last_name}', '${profile.gender}', '${profile.dob}', '${profile.email}', '${profile.password}', '${profile.pfp}');

Login (POST /api/login): Endpoint to authenticate users.
Query sent to DB:
SELECT *
FROM profile p
WHERE p.email = "${login.email}" AND p.password = "${login.password}";

Get Profile (GET /api/profile): Endpoint to retrieve the logged-in user's profile information
Query sent to DB:
SELECT p.first_name, p.last_name, p.gender, p.dob, p.email
FROM profile p
WHERE p.email = "${email}"

Update Profile (PUT /api/profile): Endpoint to update the user's profile information
Query sent to DB:
UPDATE profile
SET first_name = '${profile.first_name}', 
last_name = '${profile.last_name}', 
gender = '${profile.gender}', 
dob = '${profile.dob}', 
email = '${profile.email}', 
pfp = '${profile.pfp}'
WHERE email = '${profile.old_email}';

Delete Account (DELETE /api/profile): Endpoint to delete the logged-in user's account
Query sent to DB:
DELETE FROM profile
WHERE email = '${req.body.email}';

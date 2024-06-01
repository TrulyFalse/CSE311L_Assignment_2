# CSE311L_Assignment_2
Creating a full-fledged CRUD (Create, Read, Update, Delete) REST API using Express.js and a dynamic profile page in the frontend.

# Setup
1. Copy the code from db_create.sql and run it on XAMPP's MySQL admin page.
2. Start the server by running app.js using the terminal. Type in the terminal while in the file's directory: "node app.js"
3. The canvas .zip file contains the node_modules folder but the github repository doesn't. So to install all dependencies from the package.json file, just type "npm install" while in the "back" subfolder directory.

# Structure
The project is built using :<br>
Database:              MySQL<br>
Backend Framework:     Express JS<br>
Frontend Library:      [none]<br>
Backend Runtime Env.:  Node.JS<br>

# API documentation
Registration (POST /api/register): Endpoint to create a new user.<br>
Query sent to DB:<br>
INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)<br>
VALUES ('${profile.first_name}', '${profile.last_name}', '${profile.gender}', '${profile.dob}', '${profile.email}', '${profile.password}', '${profile.pfp}');<br>

Login (POST /api/login): Endpoint to authenticate users.<br>
Query sent to DB:<br>
SELECT *<br>
FROM profile p<br>
WHERE p.email = "${login.email}" AND p.password = "${login.password}";<br>

Get Profile (GET /api/profile): Endpoint to retrieve the logged-in user's profile information<br>
Query sent to DB:<br>
SELECT p.first_name, p.last_name, p.gender, p.dob, p.email<br>
FROM profile p<br>
WHERE p.email = "${email}"<br>

Update Profile (PUT /api/profile): Endpoint to update the user's profile information<br>
Query sent to DB:<br>
UPDATE profile<br>
SET first_name = '${profile.first_name}', <br>
last_name = '${profile.last_name}', <br>
gender = '${profile.gender}', <br>
dob = '${profile.dob}', <br>
email = '${profile.email}', <br>
pfp = '${profile.pfp}'<br>
WHERE email = '${profile.old_email}';<br>

Delete Account (DELETE /api/profile): Endpoint to delete the logged-in user's account<br>
Query sent to DB:<br>
DELETE FROM profile<br>
WHERE email = '${req.body.email}';<br>

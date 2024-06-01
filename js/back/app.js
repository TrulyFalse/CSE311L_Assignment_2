const port = 3000;

const mysql = require("mysql");
const express = require("express");
const cors = require('cors');

let app = express();
app.use(cors());
app.use(express.json());
let db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cse311l_assignment2_db'
});
db_connection.connect(
    function(err){
        if(err){
            console.log(err);
        } 
        else{
            console.log('Database connected successfully.');
        }
    }
);


// endpoints for CRUD APIs
// Create API's endpoint
app.get('/api/profile', function(req, res){
    email = req.query.email;
    const query =  `SELECT p.first_name, p.last_name, p.gender, p.dob, p.email
                    FROM profile p
                    WHERE p.email = "${email}";`;

    db_connection.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err},);
        } else {
            res.json({result: result[0],});
        }
    });
    
});


app.put('/api/update', function(req, res){
    const profile = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        old_email: req.body.old_email,
        pfp: req.body.pfp
    };

    const query =  `UPDATE profile
                    SET first_name = '${profile.first_name}', 
                    last_name = '${profile.last_name}', 
                    gender = '${profile.gender}', 
                    dob = '${profile.dob}', 
                    email = '${profile.email}', 
                    pfp = '${profile.pfp}'
                    WHERE email = '${profile.old_email}';`;

    db_connection.query(query, function(err, result){
        if(err){
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result,});
        }
    });
})

app.post('/api/profile', function (req, res) {

    const profile = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        pfp: req.body.pfp
    };

    const query =  `INSERT into profile (first_name, last_name, gender, dob, email, password, pfp)
                    VALUES ('${profile.first_name}', '${profile.last_name}', '${profile.gender}', '${profile.dob}', '${profile.email}', '${profile.password}', '${profile.pfp}');`;
    
    console.log(query);

    db_connection.query(query,
        function(err, result){
            if(err){
                res.json({
                    error: err,
                })
            }else{
                console.log(result);
                res.json({
                    result: result,
                })
            }
        }
    );
})

// Read API's endpoint
app.post("/api/login", function(req, res){
    let login = {
        email: req.body.email,
        password: req.body.password
    }

    const query =  `SELECT *
                    FROM profile p
                    WHERE p.email = "${login.email}" AND p.password = "${login.password}";`;

    db_connection.query(query,
        function (err, result){
            if(err){
                console.log(err);
                res.json({error: err,});
            }else{
                console.log(result);
                res.json({result: result,});
            }
        }
    )
})


app.delete("/api/profile", function(req, res){
    const query = `DELETE FROM profile
                    WHERE email = '${req.body.email}';`;

    db_connection.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result});
        }
    });
})


// starting server
app.listen(port, 
    function(){
    console.log("Server here! I am listening for your HTTP requests on port " + port + "!");
    }
);
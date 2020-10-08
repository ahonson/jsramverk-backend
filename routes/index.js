var express = require('express');
var router = express.Router();

require("dotenv").config();
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
console.log("PROCESSENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
    console.log("JAAAAAAAAAAAAAAAAA");
}
const db = require("../db/database.js");
console.log("MY INDEX DB: ", JSON.stringify(db));

router.get('/', function(req, res, next) {
    let sql = "SELECT report FROM reports WHERE name = ?;";
    let reportName = "About me";

    db.serialize(function() {
        db.get(sql, [reportName], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.json({ report: row.report });
            return row.report
                ? console.log(row.report)
                : console.log(`No report found with the name ${reportName}`);
        });
    });
});

router.get('/reports/week/:id', function(req, res, next) {
    let sql = "SELECT report FROM reports WHERE name = ?;";
    let reportName = "Kmom" + req.params.id.padStart(2, "0");

    db.serialize(function() {
        db.get(sql, [reportName], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                res.json({ report: row.report });
            } else {
                res.json({ report: "There is no such report in the database." });
            }
            return row
                ? console.log(row.report)
                : console.log(`No report found with the name ${reportName}`);
        });
    });
});

router.post('/register', function(req, res, next) {
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    // const sqlite3 = require('sqlite3').verbose();
    // const db = new sqlite3.Database('./db/texts.sqlite');

    console.log(userPassword, userEmail);
    bcrypt.hash(userPassword, saltRounds, function(err, hash) {
        // spara lösenord i databasen.
        db.run("INSERT INTO users (email, password) VALUES (?, ?);",
        userEmail,
        hash, (err) => {
            if (err) {
                // returnera error
                console.log("DET GICK INTE");
                return console.error(err.message);
            } else {
                // returnera korrekt svar
                console.log("DET GICK HYFSAT BRA");
            }
        });
    });

    res.status(201).json({
        data: {
            msg: "Got a POST request"
        }
    });
});

router.post('/login', function(req, res, next) {
    const bcrypt = require('bcryptjs');
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    // const sqlite3 = require('sqlite3').verbose();
    // const db = new sqlite3.Database('./db/texts.sqlite');
    const sqlQuery = "SELECT password FROM users WHERE email = '" + userEmail + "';";

    db.get(sqlQuery, (err, row) => {
        if (err) {
            return console.error(err.message);
        } else if (!row) {
            // console.log("The row is empty.");
            return
        }
        console.log(row, row.password);
        bcrypt.compare(userPassword, row.password, function(err, res1) {
        // res innehåller nu true eller false beroende på om det är rätt lösenord.
            if (res1) {
                // console.log("SAMMA - index");
                // console.log("?????????????????????????????????????????????");
                const jwt = require('jsonwebtoken');
                const payload = { email: userEmail };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", token);
                res.status(201).json({
                    data: {
                        msg: "Got a POST request",
                        token: token
                    }
                });
            } else {
                // console.log("NEJNEJNEJ - index");
                const token = "";
                res.status(201).json({
                    data: {
                        msg: "Got a failed POST request",
                        token: token
                    }
                });
            }
        });
        return row.password;
    });
});

router.post('/reports', function(req, res, next) {
    const jwt = require('jsonwebtoken');
    const token = req.body.token;
    const name = req.body.name;
    const report = req.body.report;
    var myMessage;

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // not a valid token
            myMessage = "Du är inte inloggad.";
            // console.log("Du är inte inloggad.");
        } else {
            // valid token
            if (report && name) {
                myMessage = "Du är inloggad. Din text har sparats i databasen.";
                // console.log(myMessage);
                // console.log(report);
                const sqlite3 = require('sqlite3').verbose();
                const db = new sqlite3.Database('./db/texts.sqlite');

                db.run("INSERT INTO reports (name, report) VALUES (?, ?)", [name, report], (err) => {
                    if (err) {
                        // returnera error
                        // console.log("--------------------------------");
                        // console.log(err);
                        db.run("UPDATE reports SET report = ? WHERE name = ?", [report, name], (err) => {
                            if (err) {
                                // returnera error
                                // console.log("::::::::::::::::::::::::::::::::");
                                // console.log(err);
                            }
                            // returnera korrekt svar
                        });
                    }
                    // returnera korrekt svar
                });
            } else {
                myMessage = "Tomma strängar sparas inte i databasen.";
                // console.log(myMessage);
            }
        }
    });

    res.status(201).json({
        data: {
            msg: "Got a POST request",
            info: myMessage
        }
    });
});


router.get('/user', function(req, res, next) {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

router.post('/user', function(req, res, next) {
    res.status(201).json({
        data: {
            msg: "Got a POST request"
        }
    });
});

router.put('/user', function(req, res, next) {
    res.status(204).send();
});

router.delete('/user', function(req, res, next) {
    res.status(204).send();
});

router.post("/reports",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body)
);

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // send error response
        }

        // Valid token send on the request
        next();
    });
}

module.exports = router;

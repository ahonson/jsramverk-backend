var express = require('express');
var router = express.Router();

require("dotenv").config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get('/', function(req, res, next) {
    // const currentYear = new Date().getFullYear();
    // const data = {
    //     about: {
    //         name: "Aron Tési",
    //         acronym: "arts19",
    //         age: currentYear - 1984,
    //         introduction: "I enjoy learning languages, both formal and natural."
    //     }
    // };
    //
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

// router.get('/reports/week/1', function(req, res, next) {
//     res.json({
//         report: {
//             title : "Redovisning för kmom01 - frontend",
//             github: "https://github.com/ahonson/jsramverk-frontend",
//             readme: {
//                 title: "MeAppNg",
//                 info: "This project was generated with <a href='https://github.com/angular/angular-cli'>Angular CLI</a> version 10.0.8.",
//                 setup: "Run npm install to create a node_modules directory, which contains all dependencies needed to run the Angular project.",
//                 server: "Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files. You can also run ng serve --open and the project opens up automatically in your default browser."
//             },
//             remarks: "Efter att ha läst igenom läsanvisningarna, kollat på föreläsningarna och kikat översiktligt på de tre stora ramverkens webbplatser bestämde jag mig för att använda mig av Angular i den här kursen. Anledningen till att valet föll just på Angular är bl a att de flesta jobbannonser jag stött på är ju ute efter folk som kan Angular. En annan påverkande faktor är att jag har två nära kompisar som är programmerare och båda arbetar med Angular. Dessutom fick jag höra att Angular har den brantaste inlärningskurvan av de tre stora ramverken och jag tog det som en utmaning.\nDen här veckan gällde det att fräscha upp minnet om hur Github fungerar. Jag är väldigt grön när det gäller versionshantering så jag uppskattar det att vi är tvungna att jobba med git.\nDen här veckan har jag också gjort min allra första pull request. Jag gick igenom kursrepots exempelkod för miniräknaren i Angular och upptäckte att två av funktionerna (nämligen divide() och subtract()) inte fungerade som tänkt. divide() returnerade resultatets reciproka värde, medan subtract() returnerade resultatet gånger -1. För att lösa detta gällde det att byta på argumentens inbördes ordning.\nFör att komma igång med Angular har jag tittat på <a href='https://angular.io/guide/router-tutorial'>vissa delar </a> av ramverkets officella dokumentation samt <a href='https://www.youtube.com/watch?v=Fdf5aTYRW0E'>denna</a> och <a href='https://www.youtube.com/watch?v=rAy_3SIqT-E'>denna</a> video av Traversy Media. TypeScript var också helt nytt för mig. Jag giller det här att det är ett optionellt superset över JavaScript. Man kan köra vanligt JS om man vill, men möjligheten finns att pröva något nytt.\nDet är väldigt bra att få jobba med avancerade teknologier som används i industrin. Det är inte helt omöjligt att hitta jobb om ett år känns det som."
//         }
//     });
// });
//
// router.get('/reports/week/2', function(req, res, next) {
//     res.json({
//         report: {
//             title : "Redovisning för kmom02 - backend",
//             github: "https://github.com/ahonson/jsramverk-backend",
//             readme: {
//                 title: "Me-api for Jsramverk at BTH fall 2020",
//                 info: "This project was created with the following technologies: sqlite (5.0.0), express (4.17.1), bcryptjs (2.4.3). Check out package.json for a complete list of dependencies.",
//                 setup: "Run npm install to create a node_modules directory, which contains all dependencies needed to run the project.",
//                 run: "node app.js runs the project. npm start runs the project and updates itself when you make changes to the source code."
//             },
//             remarks: "Det var ett väldigt svårt men nyttigt kursmoment. Arbetet med backend har öppnat upp en helt ny värld.\nAnrop till min POST/reports-route ska skickas tillsammans med ett giltigt token samt en icke-tom sträng. Strängen sparas i reports-tabellen i sqlite3.\nPOST/register sparar användarens inloggningsuppgifter i databasens users-tabell. POST/login skapar ett token som är giltigt i en timme. GET-routerna kan man komma åt utan inloggning och de returnerar data i json-format."
//         }
//     });
// });

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
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');

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
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/texts.sqlite');
    const sqlQuery = "SELECT password FROM users WHERE email = '" + userEmail + "';";

    db.get(sqlQuery, (err, row) => {
        if (err) {
            return console.error(err.message);
        } else if (!row) {
            console.log("The row is empty.");
            return
        }
        console.log(row, row.password);
        bcrypt.compare(userPassword, row.password, function(err, res) {
        // res innehåller nu true eller false beroende på om det är rätt lösenord.
            if (res) {
                console.log("SAMMA - index");
            } else {
                console.log("NEJNEJNEJ - index");
            }
        });
        return row.password;
    });

    console.log("?????????????????????????????????????????????");
    const jwt = require('jsonwebtoken');
    const payload = { email: userEmail };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h'});
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", token);

    console.log("My token: ", token);
    res.status(201).json({
        data: {
            msg: "Got a POST request",
            token: token
        }
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
            console.log("Du är inte inloggad.");
        } else {
            // valid token
            if (report && name) {
                myMessage = "Du är inloggad. Din text har sparats i databasen.";
                console.log(myMessage);
                console.log(report);
                const sqlite3 = require('sqlite3').verbose();
                const db = new sqlite3.Database('./db/texts.sqlite');

                db.run("INSERT INTO reports (name, report) VALUES (?, ?)", [name, report], (err) => {
                    if (err) {
                        // returnera error
                        console.log("--------------------------------");
                        console.log(err);
                        db.run("UPDATE reports SET report = ? WHERE name = ?", [report, name], (err) => {
                            if (err) {
                                // returnera error
                                console.log("::::::::::::::::::::::::::::::::");
                                console.log(err);
                            }
                            // returnera korrekt svar
                        });
                    }
                    // returnera korrekt svar
                });
            } else {
                myMessage = "Tomma strängar sparas inte i databasen.";
                console.log(myMessage);
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

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const index = require('./routes/index');
const hello = require('./routes/hello');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const app = express();
const port = 1337;

const bodyParser = require("body-parser");
// const bcrypt = require('bcryptjs');
// const saltRounds = 10;
// const myPlaintextPassword = 'longandhardP4$w0rD';
//
// const jwt = require('jsonwebtoken');
// const payload = { email: "user@example.com" };
// const secret = process.env.JWT_SECRET;
// const token = jwt.sign(payload, secret, { expiresIn: '1h'});

app.use(cors());

// jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//     if (err) {
//         // not a valid token
//     } else {
//         // valid token
//     }
// });
//
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // spara lösenord i databasen.
//     db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//     "new_hashed@user.com",
//     hash, (err) => {
//         if (err) {
//             // returnera error
//         }
//         // returnera korrekt svar
//     });
//     bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res innehåller nu true eller false beroende på om det är rätt lösenord.
//         if (res) {
//             console.log("SAMMA");
//         } else {
//             console.log("NEJNEJNEJ");
//         }
//     });
// });
//
//
//
db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
    if (err) {
        // returnera error
    }

    // returnera korrekt svar
});

db.run("INSERT INTO reports (name, report) VALUES (?, ?)",
    "About me",
    "My name is Aron. I enjoy learning languages, both formal and natural.", (err) => {
    if (err) {
        // returnera error
    }
    // returnera korrekt svar
});

db.run("INSERT INTO reports (name, report) VALUES (?, ?)",
    "Kmom01",
    "FRONTEND: This is a link to my github account: https://github.com/ahonson/jsramverk-frontend\nThis Angular project was generated with <a href='https://github.com/angular/angular-cli'>Angular CLI</a> version 10.0.8.\nRun npm install to create a node_modules directory, which contains all dependencies needed to run the Angular project.\nRun ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files. You can also run ng serve --open and the project opens up automatically in your default browser.\n\nEfter att ha läst igenom läsanvisningarna, kollat på föreläsningarna och kikat översiktligt på de tre stora ramverkens webbplatser bestämde jag mig för att använda mig av Angular i den här kursen. Anledningen till att valet föll just på Angular är bl a att de flesta jobbannonser jag stött på är ju ute efter folk som kan Angular. En annan påverkande faktor är att jag har två nära kompisar som är programmerare och båda arbetar med Angular. Dessutom fick jag höra att Angular har den brantaste inlärningskurvan av de tre stora ramverken och jag tog det som en utmaning.\nDen här veckan gällde det att fräscha upp minnet om hur Github fungerar. Jag är väldigt grön när det gäller versionshantering så jag uppskattar det att vi är tvungna att jobba med git.\nDen här veckan har jag också gjort min allra första pull request. Jag gick igenom kursrepots exempelkod för miniräknaren i Angular och upptäckte att två av funktionerna (nämligen divide() och subtract()) inte fungerade som tänkt. divide() returnerade resultatets reciproka värde, medan subtract() returnerade resultatet gånger -1. För att lösa detta gällde det att byta på argumentens inbördes ordning.\nFör att komma igång med Angular har jag tittat på <a href='https://angular.io/guide/router-tutorial'>vissa delar </a> av ramverkets officella dokumentation samt <a href='https://www.youtube.com/watch?v=Fdf5aTYRW0E'>denna</a> och <a href='https://www.youtube.com/watch?v=rAy_3SIqT-E'>denna</a> video av Traversy Media. TypeScript var också helt nytt för mig. Jag giller det här att det är ett optionellt superset över JavaScript. Man kan köra vanligt JS om man vill, men möjligheten finns att pröva något nytt.\nDet är väldigt bra att få jobba med avancerade teknologier som används i industrin. Det är inte helt omöjligt att hitta jobb om ett år känns det som.", (err) => {
    if (err) {
        // returnera error
    }
    // returnera korrekt svar
});

db.run("INSERT INTO reports (name, report) VALUES (?, ?)",
    "Kmom02",
    "BACKEND: This is a link to my github account: https://github.com/ahonson/jsramverk-backend\nThis project was created with the following technologies: sqlite (5.0.0), express (4.17.1), bcryptjs (2.4.3). Check out package.json for a complete list of dependencies.\nRun npm install to create a node_modules directory, which contains all dependencies needed to run the project.\nnode app.js runs the project. npm start runs the project and updates itself when you make changes to the source code.\n\nDet var ett väldigt svårt men nyttigt kursmoment. Arbetet med backend har öppnat upp en helt ny värld.\nAnrop till min POST/reports-route ska skickas tillsammans med ett giltigt token samt en icke-tom sträng. Strängen sparas i reports-tabellen i sqlite3.\nPOST/register sparar användarens inloggningsuppgifter i databasens users-tabell. POST/login skapar ett token som är giltigt i en timme. GET-routerna kan man komma åt utan inloggning och de returnerar data i json-format.", (err) => {
    if (err) {
        // returnera error
    }
    // returnera korrekt svar
});

db.close();

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add a route
app.use('/', index);
app.use('/hello', hello);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));

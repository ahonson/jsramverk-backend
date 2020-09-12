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
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 'longandhardP4$w0rD';

const jwt = require('jsonwebtoken');
const payload = { email: "user@example.com" };
const secret = process.env.JWT_SECRET;
const token = jwt.sign(payload, secret, { expiresIn: '1h'});

app.use(cors());

jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        // not a valid token
    } else {
        // valid token
    }
});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "new_hashed@user.com",
    hash, (err) => {
        if (err) {
            // returnera error
        }
        // returnera korrekt svar
    });
    bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res innehåller nu true eller false beroende på om det är rätt lösenord.
        if (res) {
            console.log("SAMMA");
        } else {
            console.log("NEJNEJNEJ");
        }
    });
});



db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
    if (err) {
        // returnera error
    }

    // returnera korrekt svar
});

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

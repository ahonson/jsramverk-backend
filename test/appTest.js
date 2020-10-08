/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const assert = require("chai").assert;
const exempel = require("../routes/exempel");
const db = require("../db/database.js");

console.log("MY DB: ", db);
chai.should();

chai.use(chaiHttp);

const addera = exempel.addera(2, 3);

describe("Adding test", function() {
    it("Check addition", function() {
        assert.equal(addera, 5);
    });
});

describe('Routes', () => {
    before(() => {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)", "jo@jo.jo",
            "$2a$10$vYiGTxMrFYDve3v5.bnAj.La2rkUa4cSZWXCj/ZwuDmkwgw6wCszC",
            (err) => {
                if (err) {
                    console.error("Could not insert user into db", err.message);
                }
            });
    });

    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object").that.has.all.keys('report');
                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object").that.has.all.keys('report');
                    done();
                });
        });
    });


    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object").that.has.all.keys('report');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('201 POST PATH', (done) => {
            let credentials = {
                email: "jo@jo.jo",
                password: "pass123"
            };

            chai.request(server)
                .post("/login")
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('201 POST PATH', (done) => {
            let credentials = {
                email: "do@do.do",
                password: "pass123"
            };

            chai.request(server)
                .post("/register")
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('GET /hello/blabla', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/hello/blabla")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object").that.has.all.keys('data');
                    done();
                });
        });
    });

    describe('GET /user', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/user")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.be.an("object").that.has.all.keys('data');
                    done();
                });
        });
    });

    describe('POST /user', () => {
        it('201 POST PATH', (done) => {
            chai.request(server)
                .post("/user")
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('PUT /user', () => {
        it('204 PUT PATH', (done) => {
            chai.request(server)
                .put("/user")
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('DELETE /user', () => {
        it('204 DELETE PATH', (done) => {
            chai.request(server)
                .delete("/user")
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    after(() => {
        db.run("DELETE FROM users WHERE email = (?)",
            "jo@jo.jo",
            (err) => {
                if (err) {
                    console.error("Could not insert user into db", err.message);
                }
            });

        db.run("DELETE FROM users WHERE email = (?)",
            "do@do.do",
            (err) => {
                if (err) {
                    console.error("Could not insert user into db", err.message);
                }
            });
    });
});

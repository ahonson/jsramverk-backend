CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY,
    name VARCHAR(10),
    report TEXT NOT NULL,
    UNIQUE(name)
);

INSERT INTO users (email, password) VALUES ("joe@joe.joe", "$2a$10$vYiGTxMrFYDve3v5.bnAj.La2rkUa4cSZWXCj/ZwuDmkwgw6wCszC");
-- bcrypt hash for pass123

INSERT INTO reports (name, report) VALUES (
    "About me",
    "My name is Aron. I enjoy learning languages, both formal and natural."
);

INSERT INTO reports (name, report) VALUES (
    "Kmom01",
    "FRONTEND: This is a link to my github account: https://github.com/ahonson/jsramverk-frontend\nThis Angular project was generated with <a href='https://github.com/angular/angular-cli'>Angular CLI</a> version 10.0.8.\nRun npm install to create a node_modules directory, which contains all dependencies needed to run the Angular project.\nRun ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files. You can also run ng serve --open and the project opens up automatically in your default browser.\n\nEfter att ha läst igenom läsanvisningarna, kollat på föreläsningarna och kikat översiktligt på de tre stora ramverkens webbplatser bestämde jag mig för att använda mig av Angular i den här kursen. Anledningen till att valet föll just på Angular är bl a att de flesta jobbannonser jag stött på är ju ute efter folk som kan Angular. En annan påverkande faktor är att jag har två nära kompisar som är programmerare och båda arbetar med Angular. Dessutom fick jag höra att Angular har den brantaste inlärningskurvan av de tre stora ramverken och jag tog det som en utmaning.\nDen här veckan gällde det att fräscha upp minnet om hur Github fungerar. Jag är väldigt grön när det gäller versionshantering så jag uppskattar det att vi är tvungna att jobba med git.\nDen här veckan har jag också gjort min allra första pull request. Jag gick igenom kursrepots exempelkod för miniräknaren i Angular och upptäckte att två av funktionerna (nämligen divide() och subtract()) inte fungerade som tänkt. divide() returnerade resultatets reciproka värde, medan subtract() returnerade resultatet gånger -1. För att lösa detta gällde det att byta på argumentens inbördes ordning.\nFör att komma igång med Angular har jag tittat på <a href='https://angular.io/guide/router-tutorial'>vissa delar </a> av ramverkets officella dokumentation samt <a href='https://www.youtube.com/watch?v=Fdf5aTYRW0E'>denna</a> och <a href='https://www.youtube.com/watch?v=rAy_3SIqT-E'>denna</a> video av Traversy Media. TypeScript var också helt nytt för mig. Jag giller det här att det är ett optionellt superset över JavaScript. Man kan köra vanligt JS om man vill, men möjligheten finns att pröva något nytt.\nDet är väldigt bra att få jobba med avancerade teknologier som används i industrin. Det är inte helt omöjligt att hitta jobb om ett år känns det som."
);

INSERT INTO reports (name, report) VALUES (
    "Kmom02",
    "BACKEND: This is a link to my github account: https://github.com/ahonson/jsramverk-backend\nThis project was created with the following technologies: sqlite (5.0.0), express (4.17.1), bcryptjs (2.4.3). Check out package.json for a complete list of dependencies.\nRun npm install to create a node_modules directory, which contains all dependencies needed to run the project.\nnode app.js runs the project. npm start runs the project and updates itself when you make changes to the source code.\n\nDet var ett väldigt svårt men nyttigt kursmoment. Arbetet med backend har öppnat upp en helt ny värld.\nAnrop till min POST/reports-route ska skickas tillsammans med ett giltigt token samt en icke-tom sträng. Strängen sparas i reports-tabellen i sqlite3.\nPOST/register sparar användarens inloggningsuppgifter i databasens users-tabell. POST/login skapar ett token som är giltigt i en timme. GET-routerna kan man komma åt utan inloggning och de returnerar data i json-format."
);

INSERT INTO reports (name, report) VALUES (
    "Kmom03",
    "Det gick ganska fort att driftsätta applikationerna. Jag följde guiden så gott jag kunde och det gick väldigt smidigt. Det enda jag var lite osäker på var hur Angular-appen skulle laddas upp till servern. Först clonade jag github-repot till home/deploy/git men sedan insåg jag att det gällde att rsynca projektet från min lokala dator. Vissa saker tyckte jag var konstiga. När jag är inloggad som deploy går det bra att curla till API:t med 'curl localhost:8333' men detta funkade inte från angular-appen. Där fick jag ersätta localhost:8333 med https://me-api.mothermarycomesto.me/. En annan sak är att 'ng build `--prod' alltid skapar en main.js fil med ett nytt nummer så när 'npm run deploy' rsyncar projektet till servern då överskrivs inte de gamla main.js-filerna. Dem fick jag ta bort manuellt från servern."
);

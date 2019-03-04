const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./config.js');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {editMeditation, getIndex, showMonth, showMeditation, showMeditationOk, showMeditationKo, showMeditationByJour} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player')
const port = 3300;


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
/*
const db = mysql.createConnection(config.dbConfig);

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
*/

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
// configure express to use public folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
//app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', getIndex);
app.get('/month/:month', showMonth);
//app.get('/:month/:day', showMeditation);
app.get('/show/:jour', showMeditationByJour);
app.post('/edit/:jour', editMeditation);

app.get('/success/:jour', showMeditationOk);
app.get('/error/:jour', showMeditationKo);
// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
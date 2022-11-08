const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose
    .connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));

//View EJS
app.set('view engine', 'ejs');

//Time format
var moment = require('moment');
var shortDateFormat = "MMMM Do YYYY"; 
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;

//Server PDFs as static files
app.use(express.static('files'))

//BodyParsing
app.use(express.urlencoded({extended: false}));
//Routes
app.use('/', require('./controller/save'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT))
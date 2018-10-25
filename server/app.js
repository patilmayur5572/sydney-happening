'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose  = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors())
//following routes would be used to redirect client requests based on url
const eventRoutes = require("./AdapterLayer/eventAdapter");
const userRoutes = require("./AdapterLayer/userAdapter");
const emailRoutes = require("./AdapterLayer/emailAdapter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/dist/'))); //Client-side angular build files are stored here.

const DB = require('./config/DatabaseConnectionString').mongoURI;
//Connect to DB
mongoose
    .connect(DB,{ useNewUrlParser: true })
    .then(()=>console.log('DB connected.'))
    .catch(err=>console.log(err));

//initialize routes here
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/emails", emailRoutes);

// Used to redirect to an error page if the requested url is not found.
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

module.exports= app;
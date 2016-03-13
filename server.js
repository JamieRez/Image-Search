'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var models = require('./app/models/recent.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var app = express();

mongoose.connect('mongodb://localhost:27017/urls');
var db = mongoose.connection;
    db.once('open', function(){
        console.log('dataBase has connected');
    });
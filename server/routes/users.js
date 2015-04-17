'use strict';

//users router

var express = require('express');
var restify = require('express-restify-mongoose');
var router = express.Router();
//var user = require('../domain/user');

var mongoose = require('../utils/mongoConnection');

var Schema = mongoose.Schema;

var User = new Schema({
    //user schema
    //id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    plans:[{
        destAddr: String,
        destLat: Number,
        destLng: Number,
        startDate: Date,
        endDate: Date,
        active: {type: Boolean, default: true },
        activities:[{
            venue: String,
            startTime: String, //store time as string????
            duration: Number,
            category: String
        }]
    }]
});

var UserModel = mongoose.model('User', User);

restify.serve(router, UserModel);

module.exports = router;


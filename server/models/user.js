'use strict';

var mongoose = require('../utils/mongoConnection');

var userSchema = mongoose.Schema({
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

var User = mongoose.model('User', userSchema);

module.exports = User;

//TO BE DONE
//add/modify/delete plans to user

//add/modify/delete activities to plans

//add/modofy/delete actitivity to activities


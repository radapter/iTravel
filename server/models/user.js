'use strict';

var mongoose = require('../utils/mongoConnection');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    //user schema
    //id: { type: String, required: true },
    username: { type: String, required: true, unique : true, dropDups: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique : true, dropDups: true },
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

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;
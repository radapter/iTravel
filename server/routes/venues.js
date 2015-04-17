'use strict';

//venues router

var express = require('express');
var restify = require('express-restify-mongoose');
var router = express.Router();
//var venue = require('../domain/venue');

var mongoose = require('../utils/mongoConnection');

var Schema = mongoose.Schema;

var Venue = new Schema({
    //venue schema
    id: { type: String, required: true },
    name: { type: String, required: true },
    contact: {
        phone: String,
        formattedPhone: String,
        twitter: String
    },
    location: {
        address: String,
        crossStreet: String,
        lat: Number,
        lng: Number,
        distance: Number,
        postalCode: String,
        cc: String,
        city: String,
        state: String,
        country: String,
        formattedAddress: [{
            type: String
        }]
    },
    categories:[{
        id: String,
        name: String,
        pluralName: String,
        shortName: String,
        icon:{
            perfix: String,
            suffix: String
        },
        primary: Boolean
    }],
    url: String
});

var VenueModel = mongoose.model('Venue', Venue);

restify.serve(router, VenueModel);

module.exports = router;

'use strict';

var mongoose = require('../utils/mongoConnection');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    //user schema
    //id: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique : true, dropDups: true },
    plans:[{
        destName: { type: String, required: true },
        destLat:{ type: Number, required: true },
        destLng:{ type: Number, required: true },
        startDate: Date,
        endDate: Date,
        active: {type: Boolean, default: true },
        activities:[{
            venue: {
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
            },
            startTime: String, //store time as string????
            duration: Number,
            activitiesType: String
        }]
    }]
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;
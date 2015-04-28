'use strict';

var mongoose = require('../utils/mongoConnection');

var venueSchema = mongoose.Schema({
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

var Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

//TO BE DONE
//get lng lat
//.....

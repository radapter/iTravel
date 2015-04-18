'use strict';

//users router

var express = require('express');
var restify = require('express-restify-mongoose');
var User = require('../models/user');
var auth = require('../utils/authManager');
var router = express.Router();

// GET /api/v1/users/count
// GET /api/v1/users
// PUT /api/v1/users
// POST /api/v1/users
// DELETE /api/v1/users

// GET /api/v1/users/:id
// GET /api/v1/users/:id/shallow
// PUT /api/v1/users/:id
// POST /api/v1/users/:id
// DELETE /api/v1/users/:id
restify.serve(router, User);

// POST /logout
router.post('/login', function(req, res) {
    console.log('login request received. req.body', req.body);
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err || !user) {
            res.sendStatus(400);
        }

        auth.signInUser(user, req, res, function() {
            res.json(user);
        });
    });
});

// POST /signup
router.post('/signup', function(req, res) {
    console.log('signup request received. req.body', req.body);
    var user = User(req.body);

    user.save(function(err, user) {
        if (err || !user) {
            console.log('user.save error:', err);
            res.status(500).json(err);
        } else {
            console.log('new user created. user:', user);
            auth.signInUser(user, req, res, function() {
                res.json(user);
            });
        }

    });
});

// POST /logout
router.post('/logout', function(req, res) {
    auth.destroyToken(req, res, function() {
        res.sendStatus(200);
    });
});

router.get('/dashboard', auth.authenticate, function(req,res) {
    res.sendStatus(200);
});

module.exports = router;


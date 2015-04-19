/**
 * users router and login/logout/signup routers
 */

'use strict';

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
restify.serve(router, User, {
    strict: true,
    middleware: [auth.authMiddleware],
    access: grantPrivillege,
    private: 'password'
});



// POST /logout
router.post('/login', loginHandler);
// POST /signup
router.post('/signup', signupHandler);
// POST /logout
router.post('/logout', logoutHandler);

// not a real route in use, just for testing authentication middleware
router.get('/dashboard', auth.authMiddleware, function(req,res) {
    res.sendStatus(200);
});

function grantPrivillege(req) {
    if (req.params.id === req.user._id.toString()) {
        // console.log('same user, grant private access privillege');
        return 'private';
    } else {
        // console.log('not the same user, grant public access privillege');
        // other users only have privellege to access infomation that is public 
        return 'public';
    }
}

function loginHandler(req, res) {
    console.log('login request received. req.body', req.body);
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err || !user) {
            res.sendStatus(400);
        }

        auth.signInUser(user, req, res, function() {
            res.json(user);
        });
    });
}

function signupHandler(req, res) {
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
}

function logoutHandler(req, res) {
    auth.signOutUser(req, res, function() {
        res.sendStatus(200);
    });
}

module.exports = router;


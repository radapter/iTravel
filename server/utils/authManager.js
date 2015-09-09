'use strict';

// This JWT auth manager is inspired by the tutorial: http://www.sitepoint.com/using-json-web-tokens-node-js/
// 
// JWT token is stored in HttpOnly (and secure) cookie and can be access by req.cookies.token
// 
// JWT token payload data structure:
// user: {
// 	sub: [user id here],
// 	exp: 
// }


var jwt = require('jwt-simple');
var User = require('../models/user');
var secrets = require('../secrets');

var TOKEN_EXPIRATION_TIME_IN_MINUTE = 30;

var authManager = {
	authMiddleware: authMiddleware,
	signInUser: signInUser,
	signOutUser: signOutUser
};

module.exports = authManager;

/**
 * Middleware for authentication
 * @param  {object}   req  express req obj
 * @param  {object}   res  express res obj
 * @param  {Function} next middleware callback
 * @return {void}
 */
function authMiddleware(req, res, next) {
	// check / verify token, set req.user 
	var token = req.cookies.token;
	var payload;
	var userId;
	var expirationTime;

	console.log('authMiddleware is called. token:', token);
	if (typeof token === 'undefined') {
		res.status(401).json({ errorMsg: 'SessionNotEstablished' });
	} else {
		try {
			// verify & decode token in a single step
			payload = jwt.decode(token, secrets.jwtKey);
			userId = payload.sub;
			expirationTime = payload.exp;

			// console.log('decoded payload:', payload);
			// check if token is expired
			if (expirationTime <= Date.now()) {
				console.log('token expired');
				signOutUser(req, res, function() {
			  		res.status(401).json({ errorMsg: 'SessionExpired' });
				});
			}

			// check if the user exist
			User.findOne({ _id: userId }, function(err, user) {
				if (err || !user) {
					// console.log('can\'t find user in authentication')
					res.status(400).json({ errorMsg: 'UserNotExist' });
				}

        // refresh token and cookie
				if(user)  {
					token = jwt.encode({
						sub: user._id,
						exp: Date.now() + TOKEN_EXPIRATION_TIME_IN_MINUTE * 60 * 1000
					}, secrets.jwtKey);
					res.cookie('token', token, { expires: new Date(expirationTime), httpOnly: true });

					// set req.user
					req.user = user;
					console.log('auth passed. req.user:', req.user);
					next();
				}

			});

		} catch (err) {
			console.log('token decoding excpetion, err', err);
			res.status(500).json({ errorMsg: 'TokenDecodingFailed' });
		}
	}
}

/**
 * Helper function for creating token and setting cookies
 * @param  {object}   req  express req obj
 * @param  {object}   res  express res obj
 * @return {void}
 */
function signInUser(user, req, res, next) {
	// sign token and set expire, set HttpOnly cookie
	var token;
	var expirationTime = Date.now() + TOKEN_EXPIRATION_TIME_IN_MINUTE * 60 * 1000;

	try {
		// create / sign token and set cookie 
		token = jwt.encode({
			sub: user._id,
			exp: Date.now() + TOKEN_EXPIRATION_TIME_IN_MINUTE * 60 * 1000
		}, secrets.jwtKey);
		res.cookie('token', token, { expires: new Date(expirationTime), httpOnly: true });
	  	req.user = user;

	  	next();

	} catch (err) {
		console.log('token encoding excpetion, err', err);
		res.status(500).json({ errorMsg: 'TokenDecodingFailed' });
	}

}

/**
 * Helper function for removing token cookie
 * @param  {object}   req  express req obj
 * @param  {object}   res  express res obj
 * @return {void}
 */
function signOutUser(req, res, next) {
	if (req.cookies.token) {
		res.user = null;
		res.clearCookie('token');
	}

	next();
}
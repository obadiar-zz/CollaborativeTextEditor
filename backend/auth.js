var express = require('express');
var router = express.Router();
var User = require('./models').User;
// var Contact = models.Contact;

module.exports = function (passport) {
	// Add Passport-related auth routes here, to the router!
	router.post('/register', function (req, res, next) {
		if (req.body.username && req.body.password) {
			var newUser = new User({
				username: req.body.username,
				password: req.body.password
			})
			newUser.save(function (error) {
				if (error) {
					res.status(401).json({
						success: false,
						message: error.message
					});
				} else {
					res.status(200).json({
						success: true,
						message: 'Registered Successfully!'
					});
				}
			})
		} else {
			res.status(400).json({
				success: false,
				message: 'Missing username or password.'
			});
		}
	});

	router.post('/login', passport.authenticate('local', {
		successRedirect: '/loginSuccess',
		failureRedirect: '/loginFailure'
	}));

	router.get('/loginSuccess', function (req, res) {
		res.status(200).json({
			success: true,
			message: 'Logged in Successfully!'
		});
	});

	router.get('/loginFailure', function (req, res) {
		res.status(401).json({
			success: false,
			message: 'Incorrect username or password.'
		});
	});

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}

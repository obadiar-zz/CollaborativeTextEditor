var express = require('express');
var router = express.Router();
var models = require('./models');
var User = models.User;
var Document = models.Document;

router.use('/', function (req, res, next) {
	if (req.user) {
		next();
	} else {
		res.status(401).json({
			success: false,
			message: 'You are not logged in!'
		});
	}
});

router.get('/documents', (req, res, next) => {
	Document.find({}, (error, documents) => {
		if (error){
			res.status(400).send('Error: ' + error);
		} else {
			res.status(200).json({
				documents
			})
		}
	})
});

router.post('/documents/save', (req, res, next) => {
	console.log(req.body.content)
	Document.update({ ID: req.body.ID, author: req.user._id }, {
		title: req.body.title,
		content: req.body.content,
	}, { upsert: true }, (error) => {
		if (error) {
			res.status(400).send('Error: ' + error);
			console.log('Error:', error);
		} else {
			res.status(200).send('Document saved successfully!');
		}
	})
});

module.exports = router;
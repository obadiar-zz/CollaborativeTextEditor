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
	Document.find({ collaborators: req.user._id }, (error, documents) => {
		if (error) {
			res.status(400).send('Error: ' + error);
		} else {
			res.status(200).json({
				documents
			})
		}
	})
});

router.post('/documents/save', (req, res, next) => {
	Document.findOne({ ID: req.body.ID }, (error, document) => {
		if (error) {
			res.status(400).json({
				success: false,
				message: error.message
			});
		} else if (!document) {
			let newDocument = new Document({
				ID: req.body.ID,
				owner: req.user._id,
				title: req.body.title,
				content: req.body.content,
				collaborators: [req.user._id],
				passwordProtected: req.body.password ? true : false,
			});
			if (newDocument.passWordProtected) {
				newDocument.password = req.body.password
			}
			newDocument.save((error => {
				if (error) {
					res.status(400).json({
						success: false,
						message: error.message
					});
				} else {
					res.status(200).send('New document saved successfully!');
				}
			}));
		} else {
			document.title = req.body.title;
			document.content = req.body.content;
			if (req.body.password) {
				document.passwordProtected = true;
				document.password = req.body.password
			} else {
				document.passwordProtected = false;
				document.password = undefined;
			}
			document.save((error => {
				if (error) {
					res.status(400).send('Error: ' + error);
					console.log('Error:', error);
				} else {
					res.status(200).send('Changes saved successfully!');
				}
			}));
		}
	})
});

router.post('/documents/add', (req, res, next) => {
	if (!req.body.ID.match(/^[a-zA-Z0-9]{16}$/)) {
		res.status(400).json({
			success: false,
			message: 'Invalid ID format.'
		});
	} else {
		Document.findOne({ ID: req.body.ID }, (error, document) => {
			if (error) {
				res.status(400).json({
					success: false,
					message: error.message
				});
			} else if (document && document.collaborators.indexOf(req.user._id) !== -1) {
				res.status(400).json({
					success: false,
					message: 'This document is already in the list.'
				});
			} else if (!document) {
				res.status(400).json({
					success: false,
					message: 'This document does not exist.'
				});
			} else if (!document.passwordProtected && !req.body.password) {
				document.collaborators.push(req.user._id);
				document.save((error) => {
					if (!error) {
						res.status(200).json({
							success: true,
							document
						})
					} else {
						res.status(400).json({
							success: false,
							message: 'Error adding document.'
						})
					}
				})
			} else {
				res.status(200).json({
					success: false
				})
			}
		})
	}
});


router.post('/documents/delete', (req, res, next) => {
	Document.findOneAndUpdate({ ID: req.body.ID }, { "$pull": { collaborators: req.user._id } }, (error, document) => {
		if (error) {
			res.status(400).json({
				success: false,
				message: error
			});
		} else {
			res.status(200).json({
				success: true,
				message: 'Document removed succesfully.'
			});
		}
	})

});

module.exports = router;
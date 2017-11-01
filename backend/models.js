var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);


var Schema = mongoose.Schema;

var userSchema = Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

var documentSchema = Schema({
	ID: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	content: {
		type: String
	},
	password: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);
module.exports = {
	User,
	Document
};
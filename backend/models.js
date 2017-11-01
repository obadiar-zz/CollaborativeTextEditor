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

var User = mongoose.model('User', userSchema);
module.exports = {
	User
};
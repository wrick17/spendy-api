var mongoose = require('mongoose');

var contributorSchema = new mongoose.Schema({
	//id: {type: String, required: true, index: { unique: true }},
	name: {type: String, required: true},
	active: {type: Boolean, default: true, required: true},	
});
module.exports = mongoose.model('Contributor', contributorSchema);
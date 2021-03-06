var mongoose = require('mongoose');

var contributorSchema = new mongoose.Schema({
	//id: {type: String, required: true, index: { unique: true }},
	name: {type: String, required: true, index: { unique: true }},
	active: {type: Boolean, default: true, required: true},
	expenditure: {type: Number, default: 0},
	isDeletable: {type: Boolean, default: true}
});
module.exports = mongoose.model('Contributor', contributorSchema);
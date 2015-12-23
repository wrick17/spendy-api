var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
	//id: {type: String, required: true, index: { unique: true }},
	name: {type: String, required: true}	
});
module.exports = mongoose.model('Tag', tagSchema);
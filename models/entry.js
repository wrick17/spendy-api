var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	//id: {type: String, required: true, index: { unique: true }},
	item: {type: String, required: true},
	cost: {type: Number, default: 0.0, required: true},
	time: {type: Date, default: Date.now, required: true},
	contributorId: {type: String, required: true},
	tag: {type: String, required: true}
});
module.exports = mongoose.model('Entry', entrySchema);
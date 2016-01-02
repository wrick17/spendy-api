var config = require('../config.js'),
	Entry = require('../models/entry.js'),
	Contributor = require('../models/contributor.js');	

module.exports = function (router) {
	router.route('/entry')
	//create a new entry
	.post(function (req, res) {
		var entry = new Entry();
	    
	    //entry.id = Date.now();
	    entry.item = req.body.item;
	    entry.date = new Date(req.body.date);
	    entry.cost = req.body.cost;
	    entry.contributorId = req.body.contributorId;
	    entry.tagId = req.body.tagId;

	    entry.save(function(err, entry){
			if(err)
				res.status(500).send(err);
			else
				res.json({ message: 'Success' });
		});	  	
	})
	//get all entries
	.get(function(req, res){
		if(req.query.fromDate && req.query.toDate){
			var fromDate = new Date(req.query.fromDate);
			var toDate = new Date(req.query.toDate);
		} else if(!req.query.fromDate && !req.query.toDate){
			var fromDate = new Date(-8640000000000000);
			var toDate = new Date();
		} else if(!req.query.toDate){
			var toDate = new Date();
			var fromDate = new Date(req.query.fromDate);
		} else if(!req.query.fromDate){
			var fromDate = new Date(-8640000000000000);//Tue Apr 20 -271821
			var toDate = new Date(req.query.toDate);
		}
		Entry.find({date: { $gte : fromDate, $lte: toDate }}, function(err, entry){
			if(err)
				res.status(500).send(err);
			else
				res.json(entry);
		});
	});

	router.route('/entry/:id')
	//get an entry
	.get(function(req, res) {
        Entry.findById(req.params.id, function(err, entry) {
            if (err)
                res.status(500).send(err);
            else
            	res.json(entry);
        });
    })

	// update an entry
    .put(function(req, res){

    	Entry.findById(req.params.id, function(err, entry) {
	    	if (err)
	            res.send(err);
	        else{
				//entry.userId = req.body.userId;
			    entry.item = req.body.item;
			    entry.date = new Date(req.body.date);
			    entry.cost = req.body.cost;
			    entry.contributorId = req.body.contributorId;
			    entry.tagId = req.body.tagId;			    
	        
	        	entry.save(function(err) {
	            if (err)
	                res.status(500).send(err);
	            else
	            	res.json({ message: 'Success' });
	        	});
	        }	        
		});
    })

    // delete an entry
    .delete(function(req, res) {
        Entry.remove({
            _id: req.params.id
        }, function(err, entry) {
            if (err)
                res.status(500).send(err);
            else
	            res.json({ message: 'Success' });
        });
    });
}
		
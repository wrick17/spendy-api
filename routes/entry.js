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
	    entry.time = req.body.time;
	    entry.cost = req.body.cost;
	    entry.contributorId = req.body.contributorId;
	    entry.tag = req.body.tag;

	    entry.save(function(err, entry){
			if(err)
				res.json({ message: 'Failure' });
			else
				res.json({ message: 'Success' });
		});	  	
	})
	//get all entries
	.get(function(req, res){
		Entry.find(function(err, entry){
			if(err)
				res.send(err);
			else
				res.json(entry);
		});
	});

	router.route('/entry/:id')
	//get an entry
	.get(function(req, res) {
        Entry.findById(req.params.id, function(err, entry) {
            if (err)
                res.send(err);
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
			    entry.time = req.body.time;
			    entry.cost = req.body.cost;
			    entry.contributorId = req.body.contributorId;
			    entry.tag = req.body.tag;			    
	        
	        	entry.save(function(err) {
	            if (err)
	                res.json({ message: 'Failure' });
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
                res.send(err);
            else
	            res.json({ message: 'Success' });
        });
    });
}
		
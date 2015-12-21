var config = require('../config.js'),
	Contributor = require('../models/contributor.js');	

module.exports = function (router) {
	router.route('/contributor')
	//create a contributor
	.post(function (req, res) {
		var contributor = new Contributor();
	    
	    contributor.name = req.body.name;
	    contributor.active = req.body.active;
	    
	    contributor.save(function(err, contributor){
			if(err)
				res.json({ message: 'Failure' });
			else
				res.json({ message: 'Success' });
		});	  	
	})
	//get all contributors
	.get(function(req, res){
		Contributor.find(function(err, contributor){
			if(err)
				res.send(err);
			else
				res.json(contributor);
		});
	});

	router.route('/contributor/:id')
	//get a contributor
	.get(function(req, res) {
        Contributor.findById(req.params.id, function(err, contributor) {
            if (err)
                res.send(err);
            else
            	res.json(contributor);
        });
    })

	// update a contributor
    .put(function(req, res){

    	Contributor.findById(req.params.id, function(err, contributor) {
	    	if (err)
	            res.send(err);
	        else{
				contributor.name = req.body.name;			    	    
	    		contributor.active = req.body.active;
	    		    
	        	contributor.save(function(err) {
	            if (err)
	                res.json({ message: 'Failure' });
	            else
	            	res.json({ message: 'Success' });
	        	});
	        }	        
		});
    })

    // delete a contributor
    .delete(function(req, res) {
        Contributor.remove({
            _id: req.params.id
        }, function(err, contributor) {
            if (err)
                res.send(err);
            else
	            res.json({ message: 'Success' });
        });
    });
}
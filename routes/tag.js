var config = require('../config.js'),
	Tag = require('../models/tag.js');	

module.exports = function (router) {
	router.route('/tag')
	//create a tag
	.post(function (req, res) {
		var tag = new Tag();
	    
	    tag.name = req.body.name;
	    
	    tag.save(function(err, tag){
			if(err)
				res.json({ message: 'Failure' });
			else
				res.json({ message: 'Success' });
		});	  	
	})
	//get all tags
	.get(function(req, res){
		Tag.find(function(err, tag){
			if(err)
				res.send(err);
			else
				res.json(tag);
		});
	});

	router.route('/tag/:id')
	//get a tag
	.get(function(req, res) {
        Tag.findById(req.params.id, function(err, tag) {
            if (err)
                res.send(err);
            else
            	res.json(tag);
        });
    })

	// update a tag
    .put(function(req, res){

    	Tag.findById(req.params.id, function(err, tag) {
	    	if (err)
	            res.send(err);
	        else{
				tag.name = req.body.name;			    	    
	        
	        	tag.save(function(err) {
	            if (err)
	                res.json({ message: 'Failure' });
	            else
	            	res.json({ message: 'Success' });
	        	});
	        }	        
		});
    })

    // delete a tag
    .delete(function(req, res) {
        Tag.remove({
            _id: req.params.id
        }, function(err, tag) {
            if (err)
                res.send(err);
            else
	            res.json({ message: 'Success' });
        });
    });
}
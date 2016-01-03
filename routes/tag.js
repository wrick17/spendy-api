var config = require('../config.js'),
	async = require('async'),
	Entry = require('../models/entry.js'),
	Tag = require('../models/tag.js');	

module.exports = function (router) {
	router.route('/tag')
	//create a tag
	.post(function (req, res) {
		var tag = new Tag();
	    
	    tag.name = req.body.name;
	    tag.active = req.body.active;
	    tag.save(function(err, tag){
			if(err)
				if(err.code === 11000)
					res.status(403).json({message: config.DUPLICATE_NOT_ALLOWED});
				else
					res.status(500).send(err);
			else
				res.json({ message: config.SUCCESS_MSG });
		});	  	
	})
	//get all tags
	.get(function(req, res){
		Tag.find(function(err, tags){
			if(err)
				res.status(500).send(err);
			else{
				async.each(tags,
					function(tag, callback){										
						Entry.findOne({tagId: tag._id}, function(err, entry){
							if(entry !== null)
								tag.isDeletable = false;							
							callback();
						});																																				
					},
					function(err){						
						res.json(tags);
					}
				);				
			}
		});
	});

	router.route('/tag/:id')
	//get a tag
	.get(function(req, res) {
        Tag.findById(req.params.id, function(err, tag) {
            if (err)
                res.status(500).send(err);
            else{
            	Entry.findOne({tagId: tag._id}, function(err, entry){
            		if(entry !== null)
						tag.isDeletable = false;
					res.json(tag);
				});            	
            }
        });
    })

	// update a tag
    .put(function(req, res){

    	Tag.findById(req.params.id, function(err, tag) {
	    	if (err)
	            res.send(err);
	        else{
				tag.name = req.body.name;			    	    
	        	tag.active = req.body.active;
	        	tag.save(function(err) {
	            if(err)
					if(err.code === 11000)
						res.status(403).json({message: config.DUPLICATE_NOT_ALLOWED});
					else
						res.status(500).send(err);
	            else
	            	res.json({ message: config.SUCCESS_MSG });
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
                res.status(500).send(err);
            else
	            res.json({ message: config.SUCCESS_MSG });
        });
    });
}

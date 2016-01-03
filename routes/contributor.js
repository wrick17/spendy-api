var async = require('async'),
	config = require('../config.js'),
	Entry = require('../models/entry.js'),
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
				if(err.code === 11000)
					res.status(403).json({message: config.DUPLICATE_NOT_ALLOWED});
				else
					res.status(500).send(err);
			else
				res.json({ message: config.SUCCESS_MSG });
		});	  	
	})	
	
	//get total contribution between dates
	.get(function(req, res){
		Contributor.find(function(err, contributors){
			if(err)
				res.status(500).send(err);
			else{				
				async.each(contributors,
					function(contributor, callback){
						var expenditure = 0.0;						
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
						//var firstDateOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
						Entry.find({contributorId: contributor._id, date: { $gte : fromDate, $lte: toDate }}, function(err, entries){
							async.each(entries,
								function(entry, callback){
									expenditure += entry.cost;
									callback();
								},
								function(err){									
									contributor.expenditure = expenditure;									
								}
							);							
							callback();
						});																																						
					},
					function(err){						
						res.json(contributors);
					}
				);				
			}
		});
	});

	router.route('/contributor/:id')
	//get a contributor
	.get(function(req, res) {
        Contributor.findById(req.params.id, function(err, contributor) {
            if (err)
                res.status(500).send(err);
            else{
            	var expenditure = 0.0;
				var today = new Date();
				var firstDateOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				Entry.find({contributorId: contributor._id}, function(err, entries){
					if(err)
						res.status(500).send(err);
					else{
						async.each(entries,
							function(entry, callback){
								expenditure += entry.cost;
								callback();
							},
							function(err){									
								contributor.expenditure = expenditure;									
							}
						);
						res.json(contributor);
					}
				});            	
            }
        });
    })

	// update a contributor
    .put(function(req, res){

    	Contributor.findById(req.params.id, function(err, contributor) {
	    	if (err)
	            res.status(500).send(err);
	        else{
				contributor.name = req.body.name;			    	    
	    		contributor.active = req.body.active;

	        	contributor.save(function(err) {
	            if (err)
	                res.status(500).send(err);
	            else
	            	res.json({ message: config.SUCCESS_MSG });
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
                res.status(500).send(err);
            else
	            res.json({ message: config.SUCCESS_MSG });
        });
    });
}
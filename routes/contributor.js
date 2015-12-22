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
				res.status(500).send(err);
			else
				res.json({ message: 'Success' });
		});	  	
	})
	//get all contributors
	.get(function(req, res){
		Contributor.find(function(err, contributors){
			if(err)
				res.status(500).send(err);
			else{				
				async.each(contributors,
					function(contributor, callback){
						var expenditure = 0.0;
						var today = new Date();
						var firstDateOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
						Entry.find({contributorId: contributor._id}, function(err, entries){
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

	router.route('/contributor/betweendates')
	//get total contribution between dates
	.post(function(req, res){
		Contributor.find(function(err, contributors){
			if(err)
				res.status(500).send(err);
			else{				
				async.each(contributors,
					function(contributor, callback){
						var expenditure = 0.0;
						var fromDate = new Date(req.body.fromDate);
						var toDate = new Date(req.body.toDate);
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
                res.status(500).send(err);
            else
	            res.json({ message: 'Success' });
        });
    });
}
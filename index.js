var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config.js'),
    app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.database);
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
	console.log('Mongoose is working!');
});

var router = express.Router();
require('./routes/entry.js')(router);
app.use('/api/v1', router);

var server = app.listen(process.env.PORT || config.port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Spendy API server started at port', port);

});
var express = require('express'),
    path = require('path'),
    app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join('./')));

app.get('/', function(request, response) {
  console.log('server');
  response.send('hi pratyush this is utsav!');
});

var server = app.listen(process.env.PORT || 3001, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('api server started at port ', port);

});
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+ '/../front-end'));
app.use(express.static(__dirname+'/../node_modules'));
// app.get('/', function(req, res){
//   res.sendFile('/snow.html');
// });

app.listen(port, function(err){
  if (err){
    console.log('the error is ', err);
  }
});
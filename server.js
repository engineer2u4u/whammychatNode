var express = require('express');
var clients=[];
var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), () => console.log('Example app listening on port '+app.get('port')+' !'));
//app.use(express.static('public'));
console.log("My server is running");


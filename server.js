var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), () => console.log('Example app listening on port '+app.get('port')+' !'));
console.log("My server is running");
app.get('/', (req, res) => res.send('Working Fine'));
var clients={};
var socket =  require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket)
{
	var current ;
	console.log("new connection " + socket.id);
  socket.on('twitchSocket',function(twitchId){
		if(!(twitchId in clients))
		{
		  socket.twitchId = twitchId;
		  clients[socket.twitchId] = socket;
			console.log("Connected Users"+Object.keys(clients).toString());
		 }
	  else
	  {
	  console.log("Current Users"+Object.keys(clients).toString());
	  }
	});
	socket.on('imageStream',function(twitchId,imageData){
		if(twitchId in clients)
		 {
			 console.log("sending to "+twitchId);
			 clients[twitchId].emit('imageStream',imageData);
		 }
		else
		{
			console.log("not sending to"+twitchId);
		}
	});
	
	socket.on('disconnect',function(data){
		console.log("trying to disconnect");
	if(!socket.twitchId)
	{
		return;
	}
		else
		{
		console.log("closed"+socket.twitchId);
		delete clients[socket.twitchId];
		}
		
	});
  
  
}

// app/index.js
const test_counter = require('./test_code.js')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000

var pug = require('pug')

app.get('/:idtoken', (request, response) => {  
  var idtoken = request.params.idtoken;
  var fn = pug.compileFile('app/index.pug');
  response.send(fn({title: "OVERCAST", roomId: idtoken}));
})

app.get('/timings', function(req, res){
	res.send(req);
})

var rooms = {}
var clickedcount = 0;

io.on('connection', function(socket) {
 	var room = socket.handshake['query']['room-id'];

 	console.log(room);
 	if (!rooms[room])
 	{
 		console.log("Creating Room: " + room);
 		rooms[room] = {clickedCount : 0};
 	}
	socket.join(room);

	console.log("Sending current click count of :" + rooms[room].clickedCount);
	socket.emit('news', {clicked: rooms[room].clickedCount});


	socket.on('clickEvent', function(data){
		console.log(data);
		if (data.button === 'clicked'){
			rooms[room].clickedCount += 1;
			console.log("Sending new click count of " + rooms[room].clickedCount);
			sendUpdate(room);
		}
	});
});

function sendUpdate(room)
{
	io.to(room).emit('news', {clicked: rooms[room].clickedCount});
}


server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
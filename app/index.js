// app/index.js
const test_counter = require('./test_code.js')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000

app.get('/', (request, response) => {  
  response.sendFile(__dirname + '/index.html');
})

app.get('/timings', function(req, res){
	res.send(req);
})


var clickedcount = 0;

io.on('connection', function(socket) {
	socket.emit('news', {hello: 'world'});
	socket.on('my other event', function(data){
		console.log(data);
		if (data.button === 'clicked'){
			clickedcount += 1;
			sendUpdate();
		}
	});
});

function sendUpdate()
{
	io.sockets.emit('news', {clicked: clickedcount});
}


server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
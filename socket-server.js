var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.readFile('./public/index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('message', 'You are connected');

	socket.on('message', function(msg) {
		console.log('Message from client : ' + msg);
	});
});

server.listen(8080);
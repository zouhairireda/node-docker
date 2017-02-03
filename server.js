var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;
		var jeu = new EventEmitter();

//var utils = require('utils');

var server = http.createServer(function(req, res) {
	var params = querystring.parse(url.parse(req.url).query);
	res.writeHead(200, {"Content-Type": "text/plain"});
	console.log(params);

	if('prenom' in params) {
		res.write(params['prenom']);
	jeu.emit('gameover', 'Game Over');

	}
//	utils.sayHello();
	res.end();
});

server.on('request', function() {
	console.log('Good bye');
});

jeu.on('gameover', function(message) {
	console.log(message);
});


server.listen(8080);

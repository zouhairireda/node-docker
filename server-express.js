var express = require('express');

var app = express();

app.get('/', function(req, res) {
	//res.setHeader('Content-Type', 'text/plain');
	res.sendFile('./public/index.html');
	res.end();
}).get('/person/:num', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(200).send("Person number : " + req.params.num);
	res.end();
}).get('/home/:num', function(req, res) {
	res.render('home.ejs', {num: req.params.num});
}).use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page not found');
});

app.listen(8080);
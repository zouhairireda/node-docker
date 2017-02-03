var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('cookie-session');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({secret: 'todolist'}));

app.use(function(req, res, next) {
	if(typeof(req.session.todolist) == 'undefined') {
		req.session.todolist = [];
	}
	next();
});

app.get('/todo', function(req, res) {
	res.render('todo.ejs', {todolist: req.session.todolist});
}).post('/todo/add/', urlencodedParser, function(req, res) {
	if(req.body.newtodo != '') {
		req.session.todolist.push(req.body.newtodo);
	}
	res.redirect('/todo');
}).get('/todo/delete/:id', function(req, res) {
	var id = req.params.id;
	if(id != '') {
		req.session.todolist.splice(id, 1);
	}
	res.redirect('/todo');
})
.use(function(req, res, next) {
	res.redirect('/todo');
});

app.listen(8080);
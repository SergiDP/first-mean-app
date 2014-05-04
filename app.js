
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , todos = require('./routes/todo')
  , http = require('http')
  , path = require('path');

var app = express();

var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/test');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/users', user.list);

//definde model
var Todo=Mongoose.model('Todo', {text:String});

// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', todos.mostrar(Todo));

	// create todo and send back all todos after creation
	app.post('/api/todos', todos.anadir(Todo));

	// delete a todo
	app.delete('/api/todos/:todo_id', todos.borrar(Todo));

app.get('/', routes.index);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

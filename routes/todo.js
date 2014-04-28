// JavaScript Document
var Todo=require(./
//Mostrar tareas ----------------------------------------
exports.mostrar=function(req,res){
Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if(err)
				res.send('no encontrado');
				

			res.json(todos); // return all todos in JSON format
		});
};

//Anadir tareas -------------------------------------------
exports.anadir=function(req,res){

Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
};


//Eliminar tareas --------------------------------------------
exports.borrar=function(req,res){
Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
};



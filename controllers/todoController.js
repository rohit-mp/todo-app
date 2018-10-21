var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//conect to the database
mongoose.connect("mongodb://testuser99:testuser99@ds137643.mlab.com:37643/todo", {useNewUrlParser: true})

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo', function(req, res){   
        //get data from mongodb and pass it to the view 
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    //handler when ajax request is made
    app.post('/todo', urlencodedParser, function(req, res){    
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
            if(err) throw(err)
            res.json(data);
        });
    });
};
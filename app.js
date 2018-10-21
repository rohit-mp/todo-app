var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setting up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listening to port 3000
app.listen(3000);
console.log('listening to port 3000');

require('dotenv').config();
const path          = require('path'),
      express       = require('express'),
      app           = express(),
      todoRoutes    = require('./routes/index'),
      bodyParser    = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//home route 
app.use('/api/todos', todoRoutes);

module.exports = app;
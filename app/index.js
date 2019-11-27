require('dotenv').config({ debug: process.env.DEBUG });

const express       = require('express'),
      path          = require('path'),
      app           = express(),
      port          = process.env.PORT,
      mongoose      = require('mongoose'),
      db            = mongoose.connection,
      todoRoutes    = require('./routes/todoRoutes'),
      bodyParser    = require('body-parser');

//db setup
/* mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true});
db.on('error', console.error.bind(console, '\nConnection error:\n'));
db.once('open', () => {console.log('\nDatabase connection established');}); */

//basic express setup
app.listen(port, () => {console.log(`App listening on port: ${port}`)});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//home route 
app.use('/api/todos', todoRoutes);
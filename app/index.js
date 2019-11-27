const express = require('express'),
      path    = require('path'),
      app     = express(),
      dotenv  = require('dotenv').config();
      port    = process.env.PORT;

app.listen(port, () => {console.log(`App listening on port: ${port}`)});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));

//home route 
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
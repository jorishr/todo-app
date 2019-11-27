require('dotenv').config({ debug: process.env.DEBUG });

const   mongoose = require('mongoose'),
        db       = mongoose.connection;

//db setup
mongoose.set('debug', true);
mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true});
mongoose.Promise = Promise;

db.on('error', console.error.bind(console, '\nConnection error:\n'));
db.once('open', () => {console.log('\nDatabase connection established');});

module.exports.Todo = require('./todoSchema');
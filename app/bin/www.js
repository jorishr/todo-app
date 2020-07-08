require('dotenv').config();
const   mongoose = require('mongoose'),
        db       = mongoose.connection,
        port     = process.env.PORT,
        app      = require('../index');

//basic express setup
app.listen(port, () => {console.log(`App listening on port: ${port}`)});        

//db setup

//mongoose.set('debug', true);
mongoose.connect(process.env.DB_CONN_LOCAL, {useNewUrlParser: true});
//mongoose.connect(process.env.DB_CONN_CLOUD, {useNewUrlParser: true});
mongoose.Promise = Promise;

db.on('error', console.error.bind(console, '\nConnection error:\n'));
db.once('open', () => {console.log('\nDatabase connection established');});
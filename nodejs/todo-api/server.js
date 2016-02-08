var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(config.database, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to remote database \'ds055535.mongolab.com:55535/listodo-dev\', node API running on PORT:' + config.port);
    }
});

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.listen(config.port);
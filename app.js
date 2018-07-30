var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http').Server(app);
var routes = require('./router/index.js');
app.use(bodyParser.json());
app.use(cors());
app.use('/api',routes);
http.listen(process.env.PORT || 8888, function(){
    console.log('listening on *:8888');
});

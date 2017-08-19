require('./config.js');
var express = require('express');
var compression = require('compression')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 8000;
mongoose.connect(process.env.DB_URL);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(compression())
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
require('./app/routes/userRoutes')(app);
app.get('/', function(req,res){
    res.send("Working fine")
});
app.listen(port);
console.log(`Magic happens on port ${port}`);
exports = module.exports = app;
process.on('uncaughtException', function (err) {
    console.log(err);
});

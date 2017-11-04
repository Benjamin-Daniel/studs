'use strict';
require('dotenv');
var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./app/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var PORT = process.env.PORT || 3004;

var DB_URI="mongodb://first-studs:first-studs@cluster0-shard-00-00-loasz.mongodb.net:27017,cluster0-shard-00-01-loasz.mongodb.net:27017,cluster0-shard-00-02-loasz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
//var DB_URI = process.env.DB_URI;
//connect to the mongodb server

console.log(DB_URI)

_mongoose2.default.connect(DB_URI, { useMongoClient: true }, function (err) {
    if (err) {
        return console.log(err);
    }

    return console.log("Succesfully connected to MongoDB");
});

_mongoose2.default.Promise = global.Promise;

var app = (0, _express2.default)();

//app.use('/', express.static('public'));
// Serve static files from the React app
app.use(_express2.default.static(path.join(__dirname, 'main/build')));

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

//set the routes
app.use(_routes2.default);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/main/build/index.html'));
});

app.listen(PORT, function () {
    console.log(`app lauched on http://localhost:${PORT}`);
});
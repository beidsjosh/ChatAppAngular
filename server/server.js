const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const server = require('./listen.js');
fs = require('fs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

const PORT = 3000;

app.use(cors());

server.listen(http,PORT);

app.post('/login', require('./router/postLogin'));
app.post('/postNewUser', require('./router/postNewUser'));
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors : {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
const sockets = require('./sockets.js');
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

sockets.connect(io, PORT);

server.listen(http,PORT);

MongoClient.connect(url, {/*poolSize:10,*/useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
        const dbName = 'assignmentDB';
        const db = client.db(dbName);

        require('./router/postNewUser.js')(db,app);
        require('./router/postNewGroup.js')(db,app);
        require('./router/postNewChannel.js')(db,app);
        require('./router/postAllUsers')(db,app);
        require('./router/deleteuser')(db,app,ObjectID);
        require('./router/postLogin')(db,app);
        require('./router/getUserChannels')(db,app);
        require('./router/getGroups')(db,app);

    //require('./listen.js')(http);
})

//app.post('/login', require('./router/postLogin'));
//app.post('/postNewUser', require('./router/postNewUser'));
//app.post('/postNewGroup', require('./router/postNewGroup'));
//app.post('/postNewChannel', require('./router/postNewChannel'));
//app.post('/getUsers', require('./router/postAllUsers'));
//app.post('/getGroups', require('./router/getGroups'));
//app.post('/getUserChannels', require('./router/getUserChannels'));
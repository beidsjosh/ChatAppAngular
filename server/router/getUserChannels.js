/*var fs = require('fs');

module.exports = function(req, res) {
    //var u = req.body.username;
    //console.log(u);
    fs.readFile('./data/channels.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let ChannelArray = JSON.parse(data);

        res.send(ChannelArray);
    })
}*/

module.exports = function(db,app){
    app.get('/api/getchannels', function(req,res){
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data) =>{
            res.send(data);
        });
    });
}
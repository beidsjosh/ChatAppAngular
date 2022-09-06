var fs = require('fs');

module.exports = function(req, res) {
    //var u = req.body.username;
    //console.log(u);
    fs.readFile('./data/channels.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let ChannelArray = JSON.parse(data);

        res.send(ChannelArray);
    })
}
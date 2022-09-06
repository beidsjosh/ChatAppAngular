var fs = require('fs');

module.exports = function(req, res) {
    //var u = req.body.username;
    //console.log(u);
    fs.readFile('./data/groups.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let GroupArray = JSON.parse(data);

        //console.log(UserArray);
        res.send(GroupArray);
    })
}
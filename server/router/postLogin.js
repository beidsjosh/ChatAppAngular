var fs = require('fs');

module.exports = function(req, res) {
    var u = req.body.username;
    console.log(u);
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let UserArray = JSON.parse(data);

        let i = UserArray.findIndex(user =>
            ((user.username == u)));
        let userData = UserArray[i];
        userData["ok"] = true;
        console.log(userData);
        res.send(userData);
    })
}
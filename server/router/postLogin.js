/*var fs = require('fs');

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
}*/

module.exports = function(db,app) {
    app.post('/api/login', function(req,res){
    var u = req.body.username;
    var p = req.body.password;
    console.log(u);
    console.log(p);
    const collection = db.collection('users');
    collection.find({$and:[{'username':u}, {'password': p}]}).toArray(function(err, result) {
        if (err) throw err
        console.log(result);
        if (result.length === 0){
            res.send({error: "Incorrect Username or Password"});
        } else {
        res.send(result);
        }
    });
    });
}
/*var fs = require('fs');

module.exports = function(req, res) {
    //var u = req.body.username;
    //console.log(u);
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        // the above path is with respect to where we run server.js
        if (err) throw err;
        let UserArray = JSON.parse(data);

        //console.log(UserArray);
        res.send(UserArray);
    })
}*/

module.exports = function(db,app){
    app.get('/api/getusers', function(req,res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) =>{
            res.send(data);
        });
    });
}
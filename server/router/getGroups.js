/*var fs = require('fs');

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
}*/

module.exports = function(db,app){
    app.get('/api/getgroups', function(req,res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err, data) =>{
            res.send(data);
        });
    });
}
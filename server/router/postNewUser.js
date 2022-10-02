/*var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "useremail": req.body.useremail,
        "userrole": req.body.userrole,
        "usergroup": req.body.usergroup,
        "ok": false
    }
    let uArray = [];
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        uArray = JSON.parse(data);
        console.log(userobj);
        // push new user
        uArray.push(userobj);
        // send response to user
        res.send(uArray);
        // save the file of user list
        let uArrayjson = JSON.stringify(uArray);
        fs.writeFile('./data/users.json', uArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}*/

module.exports = function(db,app){
    app.post('/api/add', function(req,res){
        let userobj = {
            "userid": req.body.userid,
            "username": req.body.username,
            "useremail": req.body.useremail,
            "userrole": req.body.userrole,
            "usergroup": req.body.usergroup,
            "ok": false
        }
        if (!req.body) {
            return res.sendStatus(400)
        }
        const collection = db.collection('users');
        collection.find({'userid': userobj.userid}).count((err,count) =>{
            if (count==0){
                collection.insertOne(userobj, (err,dbres) =>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num,err:null});
                })
            }else{
                res.send({num:0,err:"duplicate item"});
            }
        });
    });
}
/*var fs = require('fs');

module.exports = function(req, res) {
    let groupobj = {
        "groupid": req.body.groupid,
        "groupname": req.body.groupname,
    }
    let gArray = [];
    fs.readFile('./data/groups.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        gArray = JSON.parse(data);
        console.log(groupobj);
        // push new user
        gArray.push(groupobj);
        // send response to user
        res.send(gArray);
        // save the file of user list
        let gArrayjson = JSON.stringify(gArray);
        fs.writeFile('./data/groups.json', gArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}*/

module.exports = function(db,app){
    app.post('/api/addgroup', function(req,res){
        let groupobj = {
            "groupid": req.body.groupid,
            "groupname": req.body.groupname,
        }
        if (!req.body) {
            return res.sendStatus(400)
        }
        const collection = db.collection('groups');
        collection.find({'groupid': groupobj.groupid}).count((err,count) =>{
            if (count==0){
                collection.insertOne(groupobj, (err,dbres) =>{
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
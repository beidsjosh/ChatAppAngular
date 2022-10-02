/*var fs = require('fs');

module.exports = function(req, res) {
    let channelobj = {
        "channelid": req.body.channelid,
        "channelname": req.body.channelname,
        "groupsinchannel": req.body.groupsinchannel
    }
    let cArray = [];
    fs.readFile('./data/channels.json', 'utf8', function(err, data) {
        //open the file of user list
        if (err) throw err;
        cArray = JSON.parse(data);
        console.log(channelobj);
        // push new user
        cArray.push(channelobj);
        // send response to user
        res.send(cArray);
        // save the file of user list
        let cArrayjson = JSON.stringify(cArray);
        fs.writeFile('./data/channels.json', cArrayjson, 'utf-8', function(err) {
            if (err) throw err;
        });
    });
}*/

module.exports = function(db,app){
    app.post('/api/addchannel', function(req,res){
        let channelobj = {
            "channelid": req.body.channelid,
            "channelname": req.body.channelname,
            "groupsinchannel": req.body.groupsinchannel
        }
        if (!req.body) {
            return res.sendStatus(400)
        }
        const collection = db.collection('channels');
        collection.find({'channelid': channelobj.channelid}).count((err,count) =>{
            if (count==0){
                collection.insertOne(channelobj, (err,dbres) =>{
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
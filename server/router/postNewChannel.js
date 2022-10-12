//adds a new channel to the database

module.exports = function(db,app){
    app.post('/api/addchannel', function(req,res){
        //gets the submitted channel data
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
            //if no dupe, then add the data to the db
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
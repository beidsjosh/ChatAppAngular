//adds a new group

module.exports = function(db,app){
    app.post('/api/addgroup', function(req,res){
        //gets the group data from the form
        let groupobj = {
            "groupid": req.body.groupid,
            "groupname": req.body.groupname,
        }
        if (!req.body) {
            return res.sendStatus(400)
        }
        const collection = db.collection('groups');
        collection.find({'groupid': groupobj.groupid}).count((err,count) =>{
            //if no dupe, then add the data to the db
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
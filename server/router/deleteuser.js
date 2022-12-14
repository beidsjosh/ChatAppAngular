//deletes the user from the MongoDB database

module.exports = function(db,app,ObjectID){
    app.post('/api/deleteuser', function(req,res){
        if (!req.body){
            return res.sendStatus(400);
        }
        userID = req.body.userid;
        const collection = db.collection('users');
        collection.deleteOne({userid:userID}, (err, docs)=>{
            collection.find({}).toArray((err, data)=>{
                res.send(data);
            });
        });
    });
}
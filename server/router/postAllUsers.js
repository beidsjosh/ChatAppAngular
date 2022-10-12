//returns an array of all the users

module.exports = function(db,app){
    app.get('/api/getusers', function(req,res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) =>{
            res.send(data);
        });
    });
}
//returns an array of all the channels

module.exports = function(db,app){
    app.get('/api/getchannels', function(req,res){
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data) =>{
            res.send(data);
        });
    });
}
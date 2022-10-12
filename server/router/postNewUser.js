//adds a new user

module.exports = function(db,app){
    app.post('/api/adduser', function(req,res){
        //gets the submitted user data
        let userobj = {
            "userid": req.body.userid,
            "username": req.body.username,
            "password": req.body.password,
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
            //if no dupe, then add the data to the db
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
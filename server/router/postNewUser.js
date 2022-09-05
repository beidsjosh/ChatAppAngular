var fs = require('fs');

module.exports = function(req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "useremail": req.body.useremail,
        "userrole": "default",
        "usergroup": "default-group",
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
}
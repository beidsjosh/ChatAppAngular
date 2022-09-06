var fs = require('fs');

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
}
var express = require('express');
var net = require('net');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});



// COMMUNICATE WITH TRANSCODER SERVER

/* TODO
 * GET transcoder server's video list
 */
router.post('/getVideoList',function(req,res,next){
    var json = {
        "command":"getVideoList"
    };

    var client = net.connect(8888,'10.131.201.201', function(){
        var data = JSON.stringify(json);
        client.write(data);
    });

    client.on('data', function(data) {
        // console.log(data.toString());
        var data = JSON.parse(data.toString());
        console.log(data);
        res.json(data);
        client.end();
    });

    client.on('end', function() {
        console.log('client disconnected');
    });

});

/*
 * POST video task to transcoder server
 *
 */
router.post('/postVideoTask',function (req,res,next){
    var data = req.body;
    //console.log(data);
    var json = {};
    json.command = "postVideoTask";
    json.videoname = data.currentVideoname;
    json.num = data.currenttaskList.length;
    json.targetList = data.currenttaskList;
    console.log(json);
    var client = net.connect(8888,'10.131.201.201', function(){
        var data = JSON.stringify(json);
        client.write(data);
    });

    client.on('data', function(data) {
        // console.log(data.toString());
        var data = JSON.parse(data.toString());
        console.log(data);
        client.end();
    });

    client.on('end', function() {
        console.log('client disconnected');
    });
});

/* TODO
 *
 */

module.exports = router;
var express = require('express');
var http = require('http');
var net = require('net');
var fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

/* POST video */
router.post('/postVideo',function (req,res) {
    var data = req.body;
    var buf = new Buffer(data.result, 'base64'); // decode
    var json = {
        "command" : "postVideo",
        "videoname" : data.videoname,
        "buf" : buf
    };

    var client = net.connect(8888,'10.131.201.203',function () {
        var data = JSON.stringify(json);
        console.log(data.length);
        client.write(data,function (suc) {
            //console.log("write succeed");
            client.destroy();
        });
    });

    client.on('data', function(data) {
        var data = JSON.parse(data.toString());
        res.json(data);
        client.end();
    });

    client.on('end', function() {
        console.log('client disconnected');
    });

});


// COMMUNICATE WITH TRANSCODER SERVER

/*
 * Get all tasks current progress for a video
 */

router.post('/getVideoTaskState',function (req,res,next) {
    var data = req.body;
    var json = {};
    json.command = "getVideoTaskState";
    json.videoId =data.id;
    console.log(data);

    var client = net.connect(8888,'10.131.201.203', function(){
        var data = JSON.stringify(json);
        client.write(data,function (suc) {
            console.log("write succeed");
        });
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


})


/*
 * GET transcoder server's video list
 */
router.post('/getVideoList',function(req,res,next){
    var json = {
        "command":"getVideoList"
    };
    var length = JSON.stringify()
    var client = net.connect(8888,'10.131.201.203', function(){
        var data = JSON.stringify(json);
        client.write(data,function (suc) {
            console.log("write succeed");
        });
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
    console.log(data);
    var json = {};
    json.command = "postVideoTask";
    json.videoname = data.currentVideoname;
    json.id = data.currentVideoId;
    json.num = data.currenttaskList.length;
    json.targetList = data.currenttaskList;
   // console.log(json);
    var client = net.connect(8888,'10.131.201.203', function(){
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

/* TODO
 *
 */

module.exports = router;
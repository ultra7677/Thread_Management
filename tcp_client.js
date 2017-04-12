/**
 * Created by ultra on 3/10/17.
 */
var net = require("net");

var client = net.connect(8888,'10.131.201.201', function(){
    console.log('client connected');

    var json = {
        "command":"getVideoList"
    };
/*
    var json = {
        "command":"postVideoTask",
        "videoname":"big_v.mp4",
        "num":"3",
        "targetList":[
            {
                "filename":"501.mp4",
                "fmt":"h264",
                "width":"640",
                "height":"360",
                "bitrate":"1400000"
            },
            {
                "filename":"502.mp4",
                "fmt":"h264",
                "width":"640",
                "height":"360",
                "bitrate":"800000"
            },
            {
                "filename":"503.mp4",
                "fmt":"h264",
                "width":"640",
                "height":"360",
                "bitrate":"600000"
            }
        ]
    };
*/
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
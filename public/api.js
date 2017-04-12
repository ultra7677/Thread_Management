// postVideoTask
// Front-End
{
    "command":"postVideoTask",
    "video":"",
    "num":"",
    "targetList":[
      {
          "filename":"",
          "fmt":"",
          "width":"",
          "height":"",
          "bitrate":""
      }
    ]
}
// Back-End 还没有确定

// getVideoList
// Front-End
{
    "command":"getVideoTask"
}

// Back-End
{
    "command":"getVideoTask",
    "videoList":[
        {
            "id":"",
            "videoname":"",
            "taskList":""
        }
    ]
}

// getVideoCurrentInfo
// Front-End
{
    "command":"getVideoCurrentInfo",
    "videoname/id":""
}

// Back-End
{
    "taskList":[
        {
        "filename":"",
        "currentProgress":""}
    ...]
}


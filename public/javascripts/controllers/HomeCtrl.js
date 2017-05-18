// 论文每章
// 测试 数据

var app = angular.module('HomeCtrl', []);

app.controller('HomeCtrl', [
    '$scope',
    '$location',
    '$http',
    'fileReader',
    function($scope, $location, $http,fileReader) {

        $scope.currenttaskList = [];
        $scope.currentVideo = null;
        $scope.videoList = [];
        $scope.runningVideoList = [];
     //   sessionStorage.setItem('total_time',);

        var getVideoList = function(){
            $http.post('/getVideoList')
                .success(function(success){
                    console.log(success.videoList);
                    $scope.videoList = success.videoList;
                });
        }

        var getVideoTaskState = function(){
            //console.log($scope.currentVideo);
            var data = $scope.currentVideo;

            // Check if currentVideo's tasks are running
            var flag = 0;
            for (i in $scope.runningVideoList){
                if($scope.runningVideoList[i].videoname == $scope.currentVideo.videoname)
                    flag = 1;
            }

            if (flag) {
                $http.post('/getVideoTaskState', data)
                    .success(function (success) {
                        //console.log(success);
                        var progress_array = success.progress_array;
                        var total_frame = success.total_frame;
                        var core_array = success.core_array;
                        console.log(total_frame,progress_array,core_array);
                        var is_finished = 1;

                        for (i in progress_array) {
                            if ((total_frame - progress_array[i].progress) > 1)
                                is_finished = 0;
                            else{
                                /*for(j in $scope.runningVideoList){
                                    if($scope.runningVideoList[j].videoname == $scope.currentVideo.videoname){
                                        $scope.runningVideoList[j].splice(j,1);
                                    }
                                }*/
                            }
                        }

                        if (is_finished == 0) {
                            setTimeout(getVideoTaskState, 500);
                        }

                        var taskList = $scope.currentVideo.taskList;
                        for (i in progress_array) {
                            taskList[i].currentProgress = (progress_array[i].progress) / total_frame;
                        }
                    })
            }
        }
        
        getVideoList();

/*
                var single_video = {};
                single_video.id = 0;
                single_video.videoname = "big_v.mp4";
                single_video.taskList = [];
                $scope.videoList.push(single_video);

                var single_video1 = {};
                single_video1.id = 1;
                single_video1.videoname = "pig_v.mp4";
                single_video1.taskList = [];
                $scope.videoList.push(single_video1);

                var single_video2 = {};
                single_video2.id = 2;
                single_video2.videoname = "doge_v.mp4";
                single_video2.taskList = [];
                $scope.videoList.push(single_video2);
**/

        $scope.getFile = function(){
            $scope.progress = 0;
            console.log(fileReader);
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    console.log("upload finished");
                    console.log($scope.file);
                    console.log($scope.file.type);

                    var dataUrl = result;
                    var base64 = dataUrl.split(',')[1];

                    var data = {};
                    data.videoname = $scope.file.name;
                    data.result = base64;
                    console.log(data);

                    $http.post('/postVideo',data)
                        .success(function (success) {
                        });
                });
        }

        $scope.$on("fileProgress", function(e, progress) {
            $("#video-progress").css('display','block');
            $scope.progress = progress.loaded / progress.total;
            $("#video-progress-bar").css('width',  $scope.progress*100 + "%");
        });

        $scope.showVideo = function(video){
            //console.log("currentVideo ",video.videoName);
            if ($scope.currentVideo != null && $scope.currentVideo != video)
                $('#' + 'video' + $scope.currentVideo.id).removeClass("active");
            $scope.currentVideo = video;
            $scope.currenttaskList = video.taskList;
            $('#'+'video'+video.id).addClass("active");
            getVideoTaskState();
        };

        $scope.addTask = function(){
            if ($scope.currentVideo != null)
                $('#myModal').modal('show');
            else alert("请选择一个视频");
        };

        $scope.deleteTask = function (task) {
            console.log(task);
            console.log($scope.currenttaskList);
            console.log($scope.videoList);
            for (i in $scope.currenttaskList)
                if ($scope.currenttaskList[i].filename == task.filename){
                    $scope.currenttaskListF.splice(i,1);
                    break;
                }
            $scope.currentVideo.taskList = $scope.currenttaskList;
            for (i in $scope.videoList)
                if($scope.videoList[i].videoname == $scope.currentVideo.videoname){
                    $scope.videoList[i].taskList = $scope.currentVideo.taskList;
                }
        }

        $scope.submitTask = function() {
            var task = {};
            task.filename = $scope.filename;
            task.width = $scope.width;
            task.height = $scope.height;
            task.bitrate = $scope.bitrate;
            task.currentProgress = null;
            task.fmt = "h264";
            $scope.currenttaskList.push(task);
            // update videoList
            for (i in $scope.videoList)
            if ($scope.videoList[i].videoname == $scope.currentVideo.videoname)
                $scope.videoList[i].taskList = $scope.currenttaskList;
            console.log($scope.videoList);
            $('#myModal').modal('hide');
            $('#submit-button').show();
        }

        $scope.postVideoTask = function(){
            console.log($scope.currenttaskList);

            $scope.runningVideoList.push($scope.currentVideo);
            var data = {};
            data.currentVideoname = $scope.currentVideo.videoname;
            data.currentVideoId = $scope.currentVideo.id;
            data.currenttaskList = $scope.currenttaskList;
            $http.post('/postVideoTask',data)
                .success(function (success){
                    console.log(success);
                    getVideoTaskState();
                });
        }

    }
]);
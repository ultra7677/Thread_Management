var app = angular.module('HomeCtrl', []);

app.controller('HomeCtrl', [
    '$scope',
    '$location',
    '$http',
    function($scope, $location, $http) {

        $scope.currenttaskList = [];
        $scope.currentVideo = null;
        $scope.videoList = [];

        var getVideoList = function(){
            $http.post('/getVideoList')
                .success(function(success){
                    console.log(success.videoList);
                    $scope.videoList = success.videoList;
                });
        }

        getVideoList();
/*
        var single_video = {};
        single_video.id = 0;
        single_video.videoName = "big_v.mp4";
        single_video.taskList = [];
        $scope.videoList.push(single_video);

        var single_video1 = {};
        single_video1.id = 1;
        single_video1.videoName = "pig_v.mp4";
        single_video1.taskList = [];
        $scope.videoList.push(single_video1);

        var single_video2 = {};
        single_video2.id = 2;
        single_video2.videoName = "doge_v.mp4";
        single_video2.taskList = [];
        $scope.videoList.push(single_video2);
*/

        $scope.showVideo = function(video){
            //console.log("currentVideo ",video.videoName);
            if ($scope.currentVideo != null && $scope.currentVideo != video)
                $('#'+'video'+$scope.currentVideo.id).removeClass("active");
            $scope.currentVideo = video;
            $scope.currenttaskList = video.taskList;
            $('#'+'video'+video.id).addClass("active");
        };

        $scope.addTask = function(){
            if ($scope.currentVideo != null)
                $('#myModal').modal('show');
            else alert("请选择一个视频");
        };

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
            //console.log($scope.currentVideo.videoName);
            for (i in $scope.videoList)
            if ($scope.videoList[i].videoname == $scope.currentVideo.videoname)
            {
                    //console.log("wa");
                    $scope.videoList[i].taskList = $scope.currenttaskList;
                    //console.log($scope.videoList[i]);
            }
            console.log($scope.videoList);
            //$scope.currenttaskList = null;
            $('#myModal').modal('hide');
            $('#submit-button').show();
            //console.log($scope.taskList);
        }

        $scope.postVideoTask = function(){
            console.log($scope.currenttaskList);
            var data = {};
            data.currentVideoname = $scope.currentVideo.videoname;
            data.currenttaskList = $scope.currenttaskList;
            $http.post('/postVideoTask',data)
                .success(function (success){

                });
        }
    }
]);
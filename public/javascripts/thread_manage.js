var app = angular.module('thread_manage', ['ui.router','HomeCtrl']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/template/home.html',
                controller: 'HomeCtrl'
            })
        $urlRouterProvider.otherwise('home');
    }]);

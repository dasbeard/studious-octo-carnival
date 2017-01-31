//==================== Creating Angular App ====================
var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

//==================== Angular Routes ====================
app.config(function($routeProvider){
  $routeProvider
    // .when('/', {
    //   templateUrl: 'static/partials/login.html',
    //   controller: 'loginController'
    // })
    .when('/', {
      templateUrl: 'static/partials/home.html',
      controller: 'homeController'
    })
    .when('/home', {
      templateUrl: 'static/partials/home.html',
      controller: 'homeController'
    })
    .when('/addComplaint', {
      templateUrl: 'static/partials/addComplaint.html',
      controller: 'addComplaintController'
    })
    .when('/game/play', {
      templateUrl: 'static/partials/game.html',
      controller: 'newGameController'
    })
    .when('/game/show', {
      templateUrl: 'static/partials/show.html',
      controller: 'showQuestionController'
    })
    .when('/game/answer', {
      templateUrl: 'static/partials/answer.html',
      controller: 'answerQuestionController'
    })

    .otherwise({
      redirectTo: '/'
    })
});

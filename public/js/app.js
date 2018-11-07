angular.module('myApp', ['ui.router', 'ui.bootstrap']).config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.when('', '/');
          $stateProvider
          .state('home', {
            url: '/',
            templateUrl: "./html/main.html",
            controller: 'mainCtrl'
          })
          .state('about', {
            url: '/about',
            templateUrl: "./html/about.html"
          })
        })
.filter('startFrom', function() {
            return function(data, start) {
              if (start == undefined) {
                return "ready"
              } else {
                return data.slice(start);
              }
            }
          })

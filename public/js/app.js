angular.module('myApp', ['ui.router', 'ui.bootstrap']).config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.when('', '/');
          $stateProvider
          .state('home', {
            url: '/',
            templateUrl: "./views/main.html",
            controller: 'mainCtrl'
          })
          .state('about', {
            url: '/about',
            templateUrl: "./views/about.html"
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

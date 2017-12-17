define([
  'app',
  // Load Controllers here
  'controllers/app',
  'controllers/dashboard',
  'controllers/results',
  'controllers/detail'
], function (app) {
  'use strict';
  // definition of routes

   app.constant("serverConfig", {
        //"url": "http://localhost:80",
        "url": "http://18.217.180.23:3000",
       "imageStorageURL" : ''
        //"port": "80"
    });


   app.config(function ($httpProvider) {

});


  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {


  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

$ionicConfigProvider.backButton.previousTitleText(false).text('');
      //$ionicConfigProvider.backButton.previousTitleText(false);
      // url routes/states
      //$urlRouterProvider.otherwise('listaMascotas');
$urlRouterProvider.otherwise('listaMascotas');





          if(localStorage.getItem('userInfoMM') == null || 
            localStorage.getItem('userInfoMM') == 'null' || 
            localStorage.getItem('userInfoMM') == 'undefined' || 
            localStorage.getItem('userInfoMM') == undefined){

        //console.log(localStorage.getItem('userInfoTS'));
      //$urlRouterProvider.otherwise('login');
      //$urlRouterProvider.otherwise('listaMascotas');
      $urlRouterProvider.otherwise('login');
        }
        else{
         // $urlRouterProvider.otherwise('login');
           // console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('listaMascotas');
        // $urlRouterProvider.otherwise("/login");
        }




      $stateProvider
        // app states
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/templates/dashboard.html',
          controller: 'DashboardCtrl'
        })

         .state('listaMascotas', {
           cache: false,
          url: '/listaMascotas',
          templateUrl: 'app/templates/listaMascotas.html',
          controller: 'magicMindCtrl'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'app/templates/login.html',
          controller: 'loginCtrl'
        })





        


    }
  ]);
});

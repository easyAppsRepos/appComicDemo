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


/*


          if(localStorage.getItem('userInfoUD') == null || 
            localStorage.getItem('userInfoUD') == 'null' || 
            localStorage.getItem('userInfoUD') == 'undefined' || 
            localStorage.getItem('userInfoUD') == undefined){

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



*/
      $stateProvider
        // app states
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/templates/dashboard.html',
          controller: 'DashboardCtrl'
        })

         .state('listaMascotas', {
          url: '/listaMascotas',
          templateUrl: 'app/templates/listaMascotas.html',
          controller: 'listaMascotasCtrl'
        })

.state('perfil', {
          url: '/perfil/:id',
          templateUrl: 'app/templates/perfil.html',
          controller: 'perfilCtrl'
        })

.state('buscar', {
          url: '/buscar',
          templateUrl: 'app/templates/buscar.html',
          controller: 'buscarCtrl'
        })

         
.state('ayuda', {
          url: '/ayuda',
          templateUrl: 'app/templates/ayuda.html',
          controller: 'ayudaCtrl'
        })

.state('agregar', {
          url: '/agregar',
          templateUrl: 'app/templates/agregar.html',
          controller: 'agregarCtrl'
        })


.state('mensajes', {
          url: '/mensajes',
          templateUrl: 'app/templates/mensajes.html',
          controller: 'mensajesCtrl'
        })
.state('misPublicaciones', {
          url: '/misPublicaciones',
          templateUrl: 'app/templates/misPublicaciones.html',
          controller: 'misPublicacionesCtrl'
        })

         .state('contactanos', {
          url: '/contactanos',
          templateUrl: 'app/templates/contactanos.html',
          controller: 'contactanosCtrl'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'app/templates/login.html',
          controller: 'loginCtrl'
        })




        .state('results', {
          url: '/results/:search/:satTrans/:wheelChair/:wheelChairLift',
          controller: 'ResultsCtrl',
          templateUrl: 'app/templates/results.html'
        })
        .state('detail', {
          url: '/detail/:id',
          controller: 'DetailCtrl',
          templateUrl: 'app/templates/detail.html'
        })
        .state('chat', {
          url: '/chat/:id',
          controller: 'Messages',
          templateUrl: 'app/templates/chat.html'
        })

        .state('detailPublicacion', {
          url: '/detailPublicacion/:id',
          controller: 'DetailPublicacionCtrl',
          templateUrl: 'app/templates/detailPublicacion.html'
        });

        


    }
  ]);
});

define([
  'app',
  'services/event'
], function (app) {
  'use strict';



app.factory('api', function($http, $q, $window, serverConfig) {

    return {

      


getPublicaciones:function(){  

            return  $http.post(serverConfig.url+'/getPublicaciones')
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        getLugares:function(){  

            return  $http.post(serverConfig.url+'/getLugares')
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        

        registrarUsuario:function(usuario){  

            return  $http.post(serverConfig.url+'/registrarUsuario', usuario)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        doLogin:function(usuario){  

            return  $http.post(serverConfig.url+'/doLogin', usuario)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

registrarAnuncio:function(usuario){  

            return  $http.post(serverConfig.url+'/registrarAnuncio', usuario)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        registrarEvento:function(usuario){  

            return  $http.post(serverConfig.url+'/registrarEvento', usuario)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },


            getProximosEventos:function(){  

            return  $http.post(serverConfig.url+'/getEventosProximos')
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

             getPublicacion:function(idPublicacion){  
          //  console.log(idEvento);
            return  $http.post(serverConfig.url+'/getPublicacion', {id:idPublicacion})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

        getEvento:function(idEvento){  
          console.log(idEvento);
            return  $http.post(serverConfig.url+'/getEvento', {id:idEvento})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        }


    }

    });

  app.controller('DashboardCtrl', [
    '$scope',
    '$state',
    '$ionicModal',
    '$ionicLoading',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $state, $ionicModal, $ionicLoading, $ionicPopup, eventService, api) {
      $scope.search = {};

      


$scope.$on('$ionicView.enter', function(event, viewData) {


$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoSM'));

  $scope.usuarioInfo.id =  userData.id;


});


      $scope.goToList = function () {
        console.log('btn');
        $state.go('results', {
          search: $scope.search.string,
          satTrans: $scope.search.satTrans,
          wheelChair: $scope.search.wheelChair,
          wheelChairLift: $scope.search.wheelChairLift
        });
      };

      $scope.loadNext = function () {


        api.getProximosEventos().then(function (events) {

          //$scope.events = events;
          $scope.events = events.data.eventos;
          console.log(events);
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          $scope.$broadcast('scroll.infiniteScrollComplete');
           $scope.$broadcast('scroll.refreshComplete');

        });



      };

  function mensajeAlerta(tipo, mensaje){
    console.log(tipo);
    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

    console.log('ok');
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}



 $scope.registrarEvento = function(evento) {

  evento.idUsuario= $scope.usuarioInfo.id;
  console.log(evento);

  $ionicLoading.show();
                 api.registrarEvento(evento).then(function (events) {

              if(events.data.error == false){



                 mensajeAlerta(2, 'Evento agregado correctamente');

                 $scope.closeModal();


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, no se ha podido agregar el evento');

              }
              }).finally(function () {

              $ionicLoading.hide();
               });


  };

 $scope.agregarEvento = function() {
        console.log('agregarAnuncio');
        $scope.openModal("nuevoEvento.html", "slide-in-up");
  };





        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };

      $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });




      $scope.chats = [{
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }, {
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }, {
    id: 0,
    name: 'Belleza espera alegrar una vida',
    lastText: 'Dulce, hembra esterilizada vacunas al día, tamaño pequeño,año y medio muy cariñosa y amiga de los gatos fue rescatada desnutrida y enferma junto a 19 hermanos.',
    face: 'http://solomascotas.cl/registro/dist/anuncio/35/image.jpeg',
    price:'Se regala',
    discout:'Hace 3 dias'
  }];
      //$scope.remove = function(chat) {
      //eventService.remove(chat);
     // };


    }
  ]);
});

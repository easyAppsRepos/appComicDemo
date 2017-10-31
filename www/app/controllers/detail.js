/* global ionic, define */
define([
  'app',
  'services/event'
], function (app) {
  'use strict';

  app.controller('mensajesCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$state',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $window, $state, $ionicPopup, eventService, api) {



            $scope.userID=window.localStorage.getItem('userInfoUD');

            api.getChats($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });


$scope.goChat = function(ll){

if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

$state.go('chat', { id: ll });


}





    }]);
  app.controller('ayudaCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api) {

    }]);

    app.controller('agregarCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api) {



      $scope.publicacion = {};


      $scope.getImage = function() {
      navigator.camera.getPicture($scope.uploadPhotos, function(message) {
      console.log('getPic cancelled');
      }, {
      quality: 100,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
      }

      $scope.uploadPhotos = function(imageURI) {
        console.log(imageURI);
        $scope.publicacion.imagen = imageURI;
        $scope.consecutivo = Math.floor(Math.random() * 16) + 1  ;
      }


    $scope.subirComic = function (publi) {


        console.log(publi);

        if(!publi || !publi.nombre || !publi.descripcion || !publi.estado || !publi.fechaPublicacion || !publi.precio){
          mensajeAlerta(1,'Datos incompletos');
          return false;
        }

        else{


        }



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




    }]);


  app.controller('DetailCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
      api.getEvento($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data.evento;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           
          

        });





      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ]);


app.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});


app.controller('Messages', function($scope, $timeout, $ionicSideMenuDelegate, $ionicLoading, api, $stateParams, $ionicScrollDelegate) {
$ionicSideMenuDelegate.canDragContent(false)
$scope.idUsuarioChat=window.localStorage.getItem('userInfoUD');

      $ionicLoading.show();

      api.getChat($stateParams.id, window.localStorage.getItem('userInfoUD')).then(function (events) {
      $scope.perfilUsuario=events.data;
          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.messages=events.data;
         // $scope.event = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
           // $scope.loading = false;
           $ionicLoading.hide();
          $ionicScrollDelegate.scrollBottom(true);

        });

$scope.getMensajess= function(){
       

        api.getChat($stateParams.id, window.localStorage.getItem('userInfoUD')).then(function (events) {
      $scope.perfilUsuario=events.data;
          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.messages=events.data;
         // $scope.event = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
           // $scope.loading = false;
           $ionicLoading.hide();
          $ionicScrollDelegate.scrollBottom(true);

        });
}


  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function(mesa) {

if(mesa == "" || mesa ==" " || !mesa ){
  return false;
}

console.log(mesa);

/*    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);*/
      $ionicLoading.show();

      api.addMensaje($stateParams.id, window.localStorage.getItem('userInfoUD'), mesa).then(function (events) {

          console.log(events);
         // $scope.messages=events.data;

         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          $scope.data.message = "";
           // $scope.loading = false;
           //$ionicLoading.hide();
          
           $scope.getMensajess();
        });



  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

});



  app.controller('perfilCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicLoading',
    '$state',
    '$ionicPopup',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicLoading, $state, $ionicPopup, eventService, api, serverConfig) {

      $scope.loading = true;
  $scope.urlImg = serverConfig.imageStorageURL;
$scope.url = serverConfig.url;
$scope.usuarioIDUD=window.localStorage.getItem('userInfoUD');

    $scope.$on('$ionicView.enter', function(event, viewData) {

    $scope.usuarioInfo={};
    //var userData = JSON.parse(window.localStorage.getItem('userInfoUD'));

    $scope.usuarioInfo.idUsuario=  $stateParams.id;


    });


      $ionicLoading.show();

      api.getPerfil($stateParams.id).then(function (events) {
      $scope.perfilUsuario=events.data;
          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);

         // $scope.event = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
           // $scope.loading = false;
           $ionicLoading.hide();
          

        });


$scope.getEstadoC=function(da){
  if (da == 1){ return 'En venta'}
    else{return 'Vendido'}
}

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




$scope.goChat = function(ll){

if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

$state.go('chat', { id: ll });


}


$scope.cambiarFoto = function(){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = 'user'+$scope.usuarioInfo.idUsuario;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.idUsuario = $scope.usuarioInfo.idUsuario;
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, $scope.url+"/cambiarFotoPerfil", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();

  console.log('Foto cambiada correctamente');
/*  $state.reload();
  $scope.$apply(function () {
     $scope.valorF =4;
});*/


 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
 }, options);
 }
 

 }


    $scope.confirmarFoto = function(){


       var customTemplate2 ='<div style="color:white !important" ><strong>Quieres cambiar tu foto de perfil? </strong></div> ';


            $ionicPopup.show({
              template: customTemplate2,
              title: '',
              subTitle: '',
              scope: $scope,
              buttons: [
                { text: 'No', onTap: function(e) { return false; } },
                {
                  text: '<b>Si</b>',
                  type: 'button-positive ',
                  onTap: function(e) {
                    return  true;
                  }
                },
              ]
              }).then(function(res) {

              
                console.log('Tapped!', res);

                if(res){
                  $scope.cambiarFoto();
                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });

    }
    



    }
  ]);

  app.controller('DetailPublicacionCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicLoading',
    '$state',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicLoading, $state, eventService, api, serverConfig) {

      $scope.loading = true;
  $scope.urlImg = serverConfig.imageStorageURL;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/

$ionicLoading.show();
      api.getPublicacion($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
           $ionicLoading.hide();
          

        });




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



$scope.goPerfil = function(ll){


$state.go('perfil', { id: ll });


}
$scope.goChat = function(ll){

if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

$state.go('chat', { id: ll });


}


      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ]);



    app.controller('contactanosCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, eventService, api, serverConfig) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };



    }
  ]);




    app.controller('loginCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicModal, $ionicLoading,$state, eventService, api, serverConfig) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
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



    $scope.doLogin = function(user){

           console.log(user);
            $ionicLoading.show();
//usuario.email = usuario.email.toLowerCase();
          api.doLogin(user).then(function (events) {
            if(events.data.idUsuario > 0){

              window.localStorage.setItem( 'userInfoUD', events.data.idUsuario);            
                $state.go('listaMascotas');

                console.log('logueado');

            /*  if(events.data.user.verificado == 1){

                window.localStorage.setItem( 'userInfoSM', JSON.stringify(events.data.user));            
                $state.go('listaMascotas');

                console.log('logueado');

              }
              else{
                mensajeAlerta(1, 'Debes verificar tu cuenta');
                console.log('no verificado');
              }
            */


            }
            else{

            mensajeAlerta(1, 'Credenciales incorrectas');

            }
            }).finally(function () {

            $ionicLoading.hide();
      });





    }




    $scope.openModalRegistro = function(){

            $scope.openModal("nuevoUsuario.html", "slide-in-up");
    }
$scope.registrarUsuario = function(usuario){
  if(usuario.pass !== usuario.pass2){
    mensajeAlerta(1, 'La contraseña no coincide');
    return false;
  }

  $ionicLoading.show();

console.log(usuario);

api.registrarUsuario(usuario).then(function (events) {
console.log(events);
          //$scope.events = events;
          //$scope.events = events.data.evento;


          if(events.data.insertId>1){

            mensajeAlerta(2, 'Cuenta creada, ya puedes hacer login!');
              $scope.closeModal();  


          }
          else{
             mensajeAlerta(1, 'Ha ocurrido un error, la cuenta no ha podido ser creada');

          }



         // $scope.chats = events.data.publicaciones;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

  $ionicLoading.hide();
          
           // $scope.loading = false;
           
          

        });


          
    }

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


    }
  ]);




    app.controller('menuBCtrl', [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    '$timeout',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {



$scope.goTo = function(){
console.log('bac');


}

$scope.perf = function(){


$state.go('perfil', { id: window.localStorage.getItem('userInfoUD') });


}


$scope.cerrarSesion = function(){
$ionicLoading.show();

  window.localStorage.setItem( 'userInfoUD', undefined);  
  $state.go('login');
  $timeout(function () {
          $ionicHistory.clearCache();
          $ionicLoading.hide();
      }, 200)  


}



    }
  ]);


    app.controller('listaMascotasCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicLoading',
    '$ionicModal',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $stateParams, $window, $ionicPopup, $ionicLoading, $ionicModal, eventService, api, serverConfig) {

      $scope.loading = true;



$scope.foto={};
$scope.fotoNombre = 0;
 $scope.lugaresLista = 0;
  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/
  $scope.urlImg = serverConfig.imageStorageURL;
        $scope.grid_view = function() {
    if($scope.layout == 'grid'){
      $scope.layout = "list";
    } else {
      $scope.layout = "grid";
    }
  };


 

$scope.getPublis = function(){


              api.getPublicaciones().then(function (events) {

              console.log(events);
              $scope.chats=events.data;

              }).finally(function () {

              $ionicLoading.hide();
               });


/*
  $scope.chatss=[
                {
                  photo:'img/portada1.jpg',
                  nombre:'Wolverine: Enemigo del Estado',
                  descripcion:'Autores: Mark Millar y John Romita Jr. Edicion del año 2008.'
                },
                 {
                  photo:'img/portada5.jpeg',
                  nombre:'Star Wars (Comic) Oct. 1977 No. 4',
                  descripcion:'A New Hope: Part 4 of 6. "In Battle with Darth Vader!" Based on the screenplay by George Lucas. Adapted by Roy Thomas. Art by Howard Chaykin and Steve Leialoha. Published in October of 1977'
                },
                  {
                  photo:'img/portada2.jpeg',
                  nombre:'SUPERMAN * TEEN TITANS ',
                  descripcion:'Superman: Action Comics #584. JOHN BYRNE DC 1987'
                },
             
                {
                  photo:'img/portada3.jpeg',
                  nombre:'The amazing new adventures of superman',
                  descripcion:'Action Comics #1 Superman DC Loot Crate Exclusive Replica Reprint COA NEW. The comic is new and unopened, great for any collector or fan of Superman! Authenticreplica reprint of Action Comics #1.'
                },
                 
                {
                  photo:'img/portada4.jpeg',
                  nombre:'Captain America (2002 4th Series)',
                  descripcion:"Written by Robert Morales Penciled by EDDIE CAMPBELL Covers by Dave Johnson In this special two-part story, celebrated artist Eddie Campbell (From Hell) joins Robert Morales! Captain America finds himself at the crossroads where his past and a possible future meet when he's faced with a super-villain from his alternate future"
                }];*/
                       $scope.loading = false;
            $scope.$broadcast('scroll.refreshComplete');

/*     api.getPublicaciones().then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data.publicaciones;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
            $scope.$broadcast('scroll.refreshComplete');
          

        });*/

}

$scope.getPublis();

$scope.$on('$ionicView.enter', function(event, viewData) {


$scope.usuarioInfo={};
  //ßåvar userData = JSON.parse(window.localStorage.getItem('userInfoSM'));

//  $scope.usuarioInfo.id =  userData.id;


});


$scope.agregarAnuncio = function () {


if( $scope.lugaresLista == 0){

 $ionicLoading.show();
               //$state.reload();
               api.getLugares().then(function (events) {

              if(events.data.error == false){

                  console.log('lugaresload');
                  $scope.lugaresLista=events.data.lugares;
                  $scope.openModal("nuevoAnuncio.html", "slide-in-up");


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, verifique su conexion a internet');

              }
              }).finally(function () {

              $ionicLoading.hide();
               });


}

else{
   $scope.openModal("nuevoAnuncio.html", "slide-in-up");
}


        



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



$scope.registrarAnuncio = function (anuncio) {
        

        if($scope.fotoNombre == 0){

           mensajeAlerta(1, 'Debes agregar una foto');
           return false;

        }

          $ionicLoading.show();
        console.log(anuncio);
        anuncio.foto= $scope.fotoNombre;
        anuncio.idUsuario= $scope.usuarioInfo.id;


          var ft = new FileTransfer();
           ft.upload($scope.foto.imagenAnuncio, serverConfig.imageStorageURL+"/dist/anuncio/upload.php", function(result){

           console.log(JSON.stringify(result));
           // $ionicLoading.hide();

            console.log('Foto cambiada correctamente');
            //$state.reload();
               api.registrarAnuncio(anuncio).then(function (events) {

              if(events.data.error == false){



                 mensajeAlerta(2, 'Anuncio agregado correctamente');

                 $scope.closeModal();


              }
              else{

              mensajeAlerta(1, 'Ha ocurrido un error, no se ha podido agregar el anuncio');

              }
              }).finally(function () {

              $ionicLoading.hide();
               });




           }, function(error){

           console.log(JSON.stringify(error));
           $ionicLoading.hide();
           mensajeAlerta(1, 'Ha ocurrido un error. No se ha podido agregar el anuncio');

           }, $scope.optionsSc);





       

     


      };


$scope.cambiarFoto = function(){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
$scope.foto.imagenAnuncio = imageURI;
console.log(imageURI);
  var d = new Date();
var n = d.getTime();


  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = 'anuncio'+n;
 $scope.fotoNombre = 'anuncio'+n;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

$scope.optionsSc = options;
 


$ionicLoading.hide(); //bb24
/*

var ft = new FileTransfer();
 ft.upload(imageURI, serverConfig.imageStorageURL+"/upload.php", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();

  console.log('Foto cambiada correctamente');
  //$state.reload();
  $scope.$apply(function () {
     $scope.valorF =4;
});


 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
 }, options);


 */


 }
 

 }





      $scope.reload = function () {


/*        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });*/
        $scope.getPublis();


      };



      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
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




    }
  ]);



});








/* global ionic, define */
define([
  'app',
  'services/event'
], function (app) {
  'use strict';

  app.controller('mensajesCtrl', [
    '$scope',
    '$stateParams',
    '$ionicLoading',
    '$window',
    '$state',
    '$ionicPopup',
    'eventService',
    'api',
    function ($scope, $stateParams, $ionicLoading,$window, $state, $ionicPopup, eventService, api) {



            $scope.userID=window.localStorage.getItem('userInfoUD');

             $ionicLoading.show();
            api.getChats($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           
          

        });


   $scope.reload = function () {

                 $ionicLoading.show();
            api.getChats($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           $scope.$broadcast('scroll.refreshComplete');
          

        });

      };



$scope.goChat = function(ll){



if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

else{$state.go('chat', { id: ll });}

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




    app.controller('misPublicacionesCtrl', [
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
    function ($scope,  $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {




            $scope.userID=window.localStorage.getItem('userInfoUD');

             $ionicLoading.show();
            api.getMisPublicaciones($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           
          

        });


$scope.cargaPrincipal = function(){
               $ionicLoading.show();
            api.getMisPublicaciones($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           
          

        });

}





$scope.compraExterna = function(){
               $ionicLoading.show();

            api.cambiarEstadoPubli($scope.idPublicacionCalificar, 4).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          if(events.data){
          // mensajeAlerta(2,'Calificacion realizada');
            $scope.closeModal();
            $scope.cargaPrincipal();
          }
          else{
            mensajeAlerta(1,'Ha ocurrido un error');
          }
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           
          

        });

}


$scope.marcarReservado = function(idPublicacion, estadoActual){
               $ionicLoading.show();
               var estadoNuevo = 1;
               if(estadoActual == 1){
                estadoNuevo=3;
               }
            api.cambiarEstadoPubli(idPublicacion, estadoNuevo).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          if(events.data){
           $scope.cargaPrincipal();
          }
          else{
            mensajeAlerta(1,'Ha ocurrido un error');
          }
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           
          

        });

}




$scope.recuperar = function(valoracion, id, nombre){
  $scope.pop.close();
  console.log('asd' );
    $ionicLoading.show();
  console.log(valoracion);
   console.log( $scope.idCalificar);
    console.log($scope.idPublicacionCalificar);


        var calificarObjeto = {idPublicacion:$scope.idPublicacionCalificar, idUsuario:$scope.idCalificar, calificacion:valoracion};
              api.calificarPublicacion(calificarObjeto).then(function (events) {

          //$scope.events = events;
         // $scope.usuariosPost = events.data;
          console.log(events);
          if(events.data){    
            $scope.closeModal();
            mensajeAlerta(2,'Calificacion realizada');
        
            $scope.cargaPrincipal();

          }

          else{

             mensajeAlerta(1,'Ha ocurrido un error');
          }

         //$scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {
          
           $ionicLoading.hide();
           //$scope.idPublicacionCalificar = idPublicacion;
            //$scope.openModal("vendido.html", "slide-in-up");
            //$scope.loading = false;
           //$scope.$broadcast('scroll.refreshComplete');
          

        });






}

$scope.calificar = function(id, nombre){
console.log('dd55');
    
  $scope.idCalificar = id;


                      var mensaje = 'Correo Electronico'
                   var customTemplate = '<div style="text-align:center;font-family: backIssuesReg;"><img style="margin-top:10px" src="img/estree.png"> <p style="    font-size: 18px;color:white; margin-top:25px">Como valorarias tu experiencia con'+nombre+'</p>         <select ng-model="olvideEmail" style=" width: 100%; background-color: transparent; border-bottom: solid 2px #444; color:white;    margin-top: 15px; margin-bottom: 15px;"><option  value="5"  >Excelente</option><option  value="4" ng-selected="{{true}}" >Bueno</option><option  value="3"  >Regular</option><option  value="2"  >Malo</option><option  value="1"  >No lo recomiendo</option></select> <button ng-click="recuperar(olvideEmail)" class="btnRecuperar button" style="    width: 100%;background-color: #999;margin-top: 20px;height: 40px;font-family: backIssuesReg;color: white;border: none;border-radius: 2px;">Calificar</button></div>';

        $scope.pop = $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustoms',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });
    


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






$scope.marcarVendido = function (idPublicacion) {



                     api.getChats($scope.userID).then(function (events) {

          //$scope.events = events;
          $scope.usuariosPost = events.data;
          console.log(events);
         //$scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
           $scope.idPublicacionCalificar = idPublicacion;
            $scope.openModal("vendido.html", "slide-in-up");
            //$scope.loading = false;
           //$scope.$broadcast('scroll.refreshComplete');
          

        });


  

//$state.go('vendido');

/*     $ionicLoading.show();

                 api.marcarVendido($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
         //$scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            //$scope.loading = false;
           //$scope.$broadcast('scroll.refreshComplete');
          

        });
*/



}



   $scope.reload = function () {

                 $ionicLoading.show();
            api.getMisPublicaciones($scope.userID).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
         $scope.chats = events.data || [];
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

           $ionicLoading.hide();
            $scope.loading = false;
           $scope.$broadcast('scroll.refreshComplete');
          

        });

      };



$scope.goChat = function(ll){


if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

else{$state.go('chat', { id: ll });}


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


    }]);


    app.controller('agregarCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicLoading',
    '$state',
    '$ionicPopup',
    'eventService',
    'serverConfig',
    'api',
    function ($scope, $stateParams, $window, $ionicLoading, $state, $ionicPopup, eventService, serverConfig, api) {
$scope.publicacion = {};
 $scope.publicacion.imagen = 'img/ff.png';
        $scope.consecutivo = Math.floor(Math.random() * 16) + 1  ;

      

$scope.url = serverConfig.url;


      $scope.getImage = function() {
      navigator.camera.getPicture($scope.uploadPhotos, function(message) {
      console.log('getPic cancelled');
      }, {
      quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
      }



 $scope.uploadPhoto = function(imageURI,idPub) {
  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = 'pub'+idPub;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.idPublicacion = idPub;
 options.params = idPub;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, $scope.url+"/publicarComicc", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();

  //console.log('Foto cambiada correctamente');
  $scope.publicacion = {};
 $scope.publicacion.imagen = 'img/ff.png';
        $scope.consecutivo = Math.floor(Math.random() * 16) + 1  ;

  mensajeAlerta(2,'Publicacion agregada correctamente');
  $state.go('listaMascotas');
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


      $scope.uploadPhotos = function(imageURI) {
        console.log(imageURI);

    

        $scope.$apply(function () {
             $scope.publicacion.imagen = imageURI;
        $scope.consecutivo = Math.floor(Math.random() * 16) + 1  ;
});



      }

    $scope.subirComic = function (publi) {


        
        publi.idUsuario = window.localStorage.getItem('userInfoUD');
        console.log(publi);
        if(!publi || !publi.nombre || !publi.descripcion || !publi.estado || !publi.fechaPublicacion || !publi.precio){
          mensajeAlerta(1,'Datos incompletos');
          return false;
        }

        else{

          if($scope.publicacion.imagen=='img/ff.png'){
            mensajeAlerta(1,'Debes seleccionar una imagen');
            return false;
          }
            else{
                $ionicLoading.show();
                $scope.uploadPhoto($scope.publicacion.imagen,publi);
              //uploadPhoto($scope.publicacion.imagen,publi);
            }

        }



      };



    $scope.subirComiec = function (publi) {


        
        publi.idUsuario = window.localStorage.getItem('userInfoUD');
        console.log(publi);
        if(!publi || !publi.nombre || !publi.descripcion || !publi.estado || !publi.fechaPublicacion || !publi.precio){
          mensajeAlerta(1,'Datos incompletos');
          return false;
        }

        else{

          if($scope.publicacion.imagen=='img/ff.png'){
            mensajeAlerta(1,'Debes seleccionar una imagen');
            return false;
          }
            else{
                $ionicLoading.show();
                api.publicarComic(publi).then(function (events) {

                //$scope.events = events;
                //$scope.events = events.data.evento;
                console.log(events);
                $scope.insertIDP = events.data.insertId;
                // $scope.$broadcast('scroll.infiniteScrollComplete');
                }).finally(function () {
                   console.log('finally');
                   $scope.uploadPhoto($scope.publicacion.imagen,$scope.insertIDP);
                   //$scope.insertIDP
               // $ionicLoading.hide();
               // $scope.loading = false;
               // $scope.$broadcast('scroll.refreshComplete');


                });

              //uploadPhoto($scope.publicacion.imagen,publi);
            }

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


      

             api.getEvento($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data.evento;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          
            $scope.loading = false;
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
$scope.contador='2';

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



//openModalRegistro()
$scope.goChat = function(ll){

console.log(window.localStorage.getItem('userInfoUD'));
console.log(ll);


if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

else{$state.go('chat', { id: ll });}


}


$scope.cambiarFoto = function(){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 50,
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

  


        $scope.$apply(function () {
        $scope.contador= Math.floor(Math.random() * 16) + 1  ;
});


  mensajeAlerta(2,'Foto actualizada correctamente');
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

  console.log(window.localStorage.getItem('userInfoUD'));
console.log(ll);

if(window.localStorage.getItem('userInfoUD') == ll){
  mensajeAlerta(1,'No puedes empezar un chat contigo');
  return false;
}

else{$state.go('chat', { id: ll });}


}


      $scope.reload = function () {

        $ionicLoading.show();
      api.getPublicacion($stateParams.id).then(function (events) {

          //$scope.events = events;
          //$scope.events = events.data.evento;
          console.log(events);
          $scope.event = events.data;
         // $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {

          $scope.$broadcast('scroll.refreshComplete');
            $scope.loading = false;
           $ionicLoading.hide();
          

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
    '$q',
    '$stateParams',
    '$window',
    '$ionicPopup',
    '$ionicModal',
    '$ionicLoading',
    '$state',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $q, $stateParams, $window, $ionicPopup, $ionicModal, $ionicLoading,$state, eventService, api, serverConfig) {

      $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/



  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };


  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      var usuario = {
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      };


               api.addUserFb(usuario).then(function (events) {

                    if(events.data.insertId > 0){
                    window.localStorage.setItem( 'userInfoUD', events.data.insertId);            
                    //$state.go('listaMascotas'); 
                    $ionicLoading.hide();
                              
                $state.go('listaMascotas');
                    }

                    else{

                      mensajeAlerta(1, 'Ha ocurrido un error');
                      $ionicLoading.hide();
                    }

              }).finally(function () {

             
               });





     // $ionicLoading.hide();
    //$state.go('app.listaMascotas');


    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    mensajeAlerta(1, 'Ha ocurrido un error');
    $ionicLoading.hide();
  };



  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {


    facebookConnectPlugin.getLoginStatus(function(success){


      if(success.status === 'connected'){
        $ionicLoading.show();
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);
        console.log('getLoginStatus', success);

        // Check if we have our user saved

        api.verificarFBLog(success.authResponse.userID).then(function (events) { 
        if(events.data.idUsuario > 0){
            window.localStorage.setItem( 'userInfoUD', events.data.idUsuario);            
            $state.go('listaMascotas');
        }
        else{

          getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            var usuario = {
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            };

               api.addUserFb(usuario).then(function (events) {

                    if(events.data.insertId > 0){
                    window.localStorage.setItem( 'userInfoUD', events.data.insertId);            
                    $state.go('listaMascotas');
                    }

                    else{

                      mensajeAlerta(1, 'Usuario ya registrado');
                    }

              }).finally(function () {

              //$ionicLoading.hide();
              //$state.go('app.listaMascotas');
               });




            
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
            mensajeAlerta(1, 'Ha ocurrido un error');
          });
         //   mensajeAlerta(1, 'Credenciales incorrectas');



        }}).finally(function () {$ionicLoading.hide();});

/*

        if(!user.userID){


          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });


        }else{
          $state.go('app.home');
        }*/
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Ingresando...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };


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

            $scope.openModal("nuevoAnuncio.html", "slide-in-up");
    }
$scope.registrarUsuario = function(usuario){
  if(usuario.pass !== usuario.pass2){
    mensajeAlerta(1, 'La contraseña no coincide');
    return false;
  }

    usuario.telefono =  usuario.telefono || '';

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



    app.controller('buscarCtrl', [
    '$scope',
    '$q',
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
    function ($scope, $q, $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {


      $scope.buscar = function(palabra){
        console.log(palabra);

      }



$scope.buscar = function(palabra){

 $ionicLoading.show();
              api.buscar(palabra).then(function (events) {

              console.log(events);
              $scope.chats=events.data || [];

              }).finally(function () {

              $ionicLoading.hide();
               });

}



}]);


        app.controller('menuBCtrl', [
    '$scope',
    '$q',
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
    function ($scope, $q, $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {


      $scope.buscar = function(palabra){
        console.log(palabra);

      }






}]);




    app.controller('menuBsssCtrl', [
    '$scope',
    '$q',
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
    function ($scope, $q, $stateParams, $ionicHistory, $window, $ionicPopup, $ionicModal, 
      $ionicLoading,$state, $timeout, eventService, api, serverConfig) {



$scope.sesion= window.localStorage.getItem('userInfoUD');
console.log($scope.sesion);

$scope.goTo = function(){
console.log('bac');


}
   $scope.inicio = true;
    $scope.regis = false;

$scope.slideChanged = function(index) {
switch(index) {
case 0:
   $scope.inicio = true;
    $scope.regis = false;
break;
case 1:
   $scope.regis = true;
   $scope.inicio = false;
break;
}
};





    $scope.openModalRegistro = function(){

            $scope.openModal("nuevoAnuncio.html", "slide-in-up");
    }

  $scope.InicioOn = function(){

           $scope.$broadcast('slideBox.setSlide', 0);
    }

      $scope.registroOn = function(){

           $scope.$broadcast('slideBox.setSlide', 1);
    }


        $scope.recuperarContra = function(email){

          if(email){
                    $ionicLoading.show();
                      api.recuperar(email).then(function (events) {

                console.log(events);
                console.log(events.data.data.affectedRows);

                if(events && events.data.data.affectedRows > 0){



                $scope.closeModal();
                 mensajeAlerta(2, 'Clave enviada a tu correo electronico');
                }

                else{

           mensajeAlerta(1, 'Usuario incorrecto');

                }

                }).finally(function () {

                $ionicLoading.hide();
               
                //$state.go('app.listaMascotas');
                });
          }

          else{
            console.log('iv');
              mensajeAlerta(1, 'Email Invalido');
          }
 }





  //$scope.$broadcast('slideBox.setSlide', index);
$scope.perf = function(){


  var  ids=window.localStorage.getItem('userInfoUD');
  if ( ids == 'undefined' || ids == null || ids == undefined) {
  // Your variable is undefined
     $scope.openModal("nuevoAnuncio.html", "slide-in-up");
    }

    else{

       $state.go('perfil', { id: ids });
    }


//console.log(window.localStorage.getItem('userInfoUD'));
/*if(typeof window.localStorage.getItem('userInfoUD') !== 'undefined'){
  $state.go('perfil', { id: window.localStorage.getItem('userInfoUD') });
}
else{

   //  $state.go('login');
  // $scope.openModalRegistro();
   $scope.openModal("nuevoUsuario.html", "slide-in-up");
}*/
}


$scope.misPublicaciones = function(){

//console.log(window.localStorage.getItem('userInfoUD'));
if(window.localStorage.getItem('userInfoUD') && window.localStorage.getItem('userInfoUD')>0){
  $state.go('misPublicaciones');
}
else{

   //  $state.go('login');
   $scope.openModalRegistro();
}
}

$scope.goMensajes = function(){

//console.log(window.localStorage.getItem('userInfoUD'));
if(window.localStorage.getItem('userInfoUD') && window.localStorage.getItem('userInfoUD')>0){
  $state.go('mensajes');
}
else{

   //  $state.go('login');
   $scope.openModalRegistro();
}
}

$scope.goChatt = function(lls){

//c/onsole.log(window.localStorage.getItem('userInfoUD'));
if(window.localStorage.getItem('userInfoUD') && window.localStorage.getItem('userInfoUD')>0){
  if(lls == window.localStorage.getItem('userInfoUD')){mensajeAlerta(1,'No puedes iniciar un chat contigo!');}
  else{$state.go('chat', { id: lls });}
}
else{

   //  $state.go('login');
   $scope.openModalRegistro();
}
}



$scope.publicarC = function(){

//console.log(window.localStorage.getItem('userInfoUD'));
if(window.localStorage.getItem('userInfoUD') && window.localStorage.getItem('userInfoUD')>0){
  $state.go('agregar');
}
else{

   //  $state.go('login');
   $scope.openModalRegistro();
}
}



$scope.cerrarSesion = function(){
$ionicLoading.show();
var deviceId = ionic.Platform.device().uuid;
 var userID=window.localStorage.getItem('userInfoUD');
          api.cerrarSesion(deviceId, userID).then(function (events) {
            console.log(events);
          }).finally(function () {
            window.localStorage.setItem( 'userInfoUD', undefined);  
            $state.go('listaMascotas');
            $timeout(function () {
             $ionicLoading.hide();
              location.reload();
/*            $ionicHistory.clearCache();
          location.reload();
            $window.location.reload(true);*/
            }, 500);  
           
          });
}


$scope.pushK=function(userID){
//pusjj
        if(localStorage.getItem('pushKeyUD')){
        var pushKeyii=  localStorage.getItem('pushKeyUD');
        var device= ionic.Platform.platform();
        var uuid=ionic.Platform.device().uuid;
        var logIn = Date.now();


        var pushState = { 
        pushK:pushKeyii, 
        device:device,
        deviceId:uuid,
        login: logIn,
        user:userID
        }

        console.log(pushState);

api.addPush(pushState).then(function (events) {

console.log(events);
}).finally(function () {});



        }else{console.log("nopushK");}
//endPush

}




//  LOGIN     *************************************************************

         $scope.loading = true;

  /*    eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

*/



  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };


  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      var usuario = {
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      };


               api.addUserFb(usuario).then(function (events) {

                    if(events.data.insertId > 0){
                    window.localStorage.setItem( 'userInfoUD', events.data.insertId);            
                    //$state.go('listaMascotas'); 
                    

                                    if(localStorage.getItem('pushKeyUD')){
                var pushKeyii=  localStorage.getItem('pushKeyUD');
                var device= ionic.Platform.platform();
                var uuid=ionic.Platform.device().uuid;
                var logIn = Date.now();


                var pushState = { 
                pushK:pushKeyii, 
                device:device,
                deviceId:uuid,
                login: logIn,
                user:events.data.insertId
                }

                console.log(pushState);

                api.addPush(pushState).then(function (events) {

                console.log(events);
                }).finally(function () {
                  $ionicLoading.hide();
                    $timeout(function() {
   location.reload();
});
                });



                }else{

                  console.log("nopushK");
  $timeout(function() {
   location.reload();
});
                }


                              
             //  $scope.closeModal();
                    }

                    else{

                      mensajeAlerta(1, 'Ha ocurrido un error');
                      $ionicLoading.hide();
                    }

              }).finally(function () {

             
               });





     // $ionicLoading.hide();
    //$state.go('app.listaMascotas');


    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    mensajeAlerta(1, 'Ha ocurrido un error');
    $ionicLoading.hide();
  };



  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {


    facebookConnectPlugin.getLoginStatus(function(success){


      if(success.status === 'connected'){
        $ionicLoading.show();
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);
        console.log('getLoginStatus', success);

        // Check if we have our user saved

        api.verificarFBLog(success.authResponse.userID).then(function (events) { 

          console.log(events);


        if(events.data && events.data.idUsuario > 0){
            window.localStorage.setItem( 'userInfoUD', events.data.idUsuario);            
            //$state.go('listaMascotas');
                            if(localStorage.getItem('pushKeyUD')){
                var pushKeyii=  localStorage.getItem('pushKeyUD');
                var device= ionic.Platform.platform();
                var uuid=ionic.Platform.device().uuid;
                var logIn = Date.now();


                var pushState = { 
                pushK:pushKeyii, 
                device:device,
                deviceId:uuid,
                login: logIn,
                user:events.data.idUsuario
                }

                console.log(pushState);

                api.addPush(pushState).then(function (events) {

                console.log(events);
                }).finally(function () {

                    $timeout(function() {
   location.reload();
});
                });



                }else{

                  console.log("nopushK");
  $timeout(function() {
   location.reload();
});
                }
                    
        }
        else{

          getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            console.log(profileInfo);
            var usuario = {
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            };

               api.addUserFb(usuario).then(function (events) {
console.log(events);
                    if(events.data.insertId > 0){
                    window.localStorage.setItem( 'userInfoUD', events.data.insertId);            
                    //$state.go('listaMascotas');
                   // $scope.closeModal();



                                    if(localStorage.getItem('pushKeyUD')){
                var pushKeyii=  localStorage.getItem('pushKeyUD');
                var device= ionic.Platform.platform();
                var uuid=ionic.Platform.device().uuid;
                var logIn = Date.now();


                var pushState = { 
                pushK:pushKeyii, 
                device:device,
                deviceId:uuid,
                login: logIn,
                user:events.data.insertId
                }

                console.log(pushState);

                api.addPush(pushState).then(function (events) {

                console.log(events);
                }).finally(function () {

                  $timeout(function() {
   location.reload();
});
                });



                }else{

                  console.log("nopushK");
  $timeout(function() {
   location.reload();
});
                }
                    
                    }

                    else{

                      mensajeAlerta(1, 'Usuario ya registrado');
                    }

              }).finally(function () {

              //$ionicLoading.hide();
              //$state.go('app.listaMascotas');
               });




            
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
            mensajeAlerta(1, 'Ha ocurrido un error');
          });
         //   mensajeAlerta(1, 'Credenciales incorrectas');



        }}).finally(function () {$ionicLoading.hide();});

/*

        if(!user.userID){


          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });


        }else{
          $state.go('app.home');
        }*/
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Ingresando...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };


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
              //  $state.go('listaMascotas');
                $scope.closeModal();


                if(localStorage.getItem('pushKeyUD')){
                var pushKeyii=  localStorage.getItem('pushKeyUD');
                var device= ionic.Platform.platform();
                var uuid=ionic.Platform.device().uuid;
                var logIn = Date.now();


                var pushState = { 
                pushK:pushKeyii, 
                device:device,
                deviceId:uuid,
                login: logIn,
                user:events.data.idUsuario
                }

                console.log(pushState);

                api.addPush(pushState).then(function (events) {

                console.log(events);
                }).finally(function () {

                     $timeout(function() {
     //$window.location.reload(true);
     location.reload();
});
                });



                }else{

                  console.log("nopushK");


  $timeout(function() {
   location.reload();
});
                }
                    

                console.log('logueado');


            }
            else{

            mensajeAlerta(1, 'Credenciales incorrectas');

            }
            }).finally(function () {

            $ionicLoading.hide();
      });





    }




$scope.registrarUsuario = function(usuario){
  if(usuario.pass !== usuario.pass2){
    mensajeAlerta(1, 'La contraseña no coincide');
    return false;
  }

    usuario.telefono =  usuario.telefono || '';

  $ionicLoading.show();

console.log(usuario);

api.registrarUsuario(usuario).then(function (events) {
console.log(events);
          //$scope.events = events;
          //$scope.events = events.data.evento;


          if(events.data.insertId>1){

            mensajeAlerta(2, 'Cuenta creada, ya puedes hacer login!');
              //$scope.closeModal();  
             // $scope.usuario={};
              $scope.InicioOn();


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

//  END LOGIN *************************************************************

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
    $scope.inicio = true;
    $scope.regis = false;
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });





    }
  ]);


    app.controller('listaMascotasCtrl', [
    '$scope',
    '$rootScope',
    '$interval',
    '$stateParams',
    '$timeout',
    '$window',
    '$ionicSideMenuDelegate',
    '$ionicPopup',
    '$ionicLoading',
    '$ionicModal',
    'eventService',
    'api',
    'serverConfig',
    function ($scope, $rootScope, $interval, $stateParams, $timeout, $window, $ionicSideMenuDelegate, $ionicPopup, $ionicLoading, $ionicModal, eventService, api, serverConfig) {

      $scope.loading = true;

   $ionicSideMenuDelegate.canDragContent(false);
$scope.ultimaPalabra=' - ';
$scope.foto={};
$scope.fotoNombre = 0;
 $scope.lugaresLista = 0;
$ionicLoading.show();


$scope.$on('cambiarTxto', function(event, args) {

    $scope.ultimaPalabra=args.palabra;
    $scope.start(args.palabra);
});


   var promise;
  
    // simulated items array
 
    
    // starts the interval
    $scope.start = function(pal) {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop(); 
      
      // store the interval promise
     //$interval(setRandomizedCollection(pal), 2000);
    promise =  $interval(function() {
    setRandomizedCollection(pal);
}, 2000);

    };
  
    // stops the interval
    $scope.stop = function() {
      $interval.cancel(promise);
    };


   function setRandomizedCollection(pal) {

      // items to randomize 1 - 11
    TTS.speak({
          text: pal,
          locale: 'es-AR',
          rate: 0.75
      }, function () {
          console.log('success');
      }, function (reason) {
          console.log(reason);
      });


    }
  


    $ionicLoading.show({
      template: 'Configurando...'
    });

          $timeout( function(){

            $ionicLoading.hide();
                      if(localStorage.getItem('pushKeyMM')){
          var pushKeyii=  localStorage.getItem('pushKeyMM');
          var device= ionic.Platform.platform();
          var uuid=ionic.Platform.device().uuid;
          var logIn = Date.now();
          var userID = 1;

          var pushState = { 
          pushK:pushKeyii, 
          device:device,
          deviceId:uuid,
          login: logIn,
          user:userID
          }

          console.log(pushState);

          api.addPush(pushState).then(function (events) {

          console.log(events);
          console.log('ole');
          }).finally(function () {});



          }else{console.log("nopushK");}


        }, 5000 );




   

       


 




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


 


$scope.boto = function(){

  // basic usage 
TTS.speak('hello, world!', function () {
        console.log('success');
    }, function (reason) {
        console.log(reason);
    });


}

$scope.boto2 = function(){
$rootScope.$broadcast('cambiarTxto', { palabra: 'carro' });


}




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
 quality: 50,
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








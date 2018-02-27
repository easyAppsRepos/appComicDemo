define([
  'app'
], function (app) {
  'use strict';
  // the run blocks
  app.run([
    '$ionicPlatform', '$interval', '$rootScope',  '$ionicPopup',
    function ($ionicPlatform, $interval, $rootScope, $ionicPopup) {
      $ionicPlatform.ready(function() {
        console.log(ionic.Platform.platform());
    //PUSH FUNCIONANDO

var push = PushNotification.init({
    "android": {
        "senderID": "22934730845"
    },
    "ios": {
        "alert": "true",
        "badge": "true",
        "sound": "true"
    },
    "windows": {}
});

push.on('registration', function(data) {
    
   //alert("alert1");
   //alert(data.registrationId);
   console.log('regsustr');
      localStorage.setItem('pushKeyMM', data.registrationId);
   //localStorage.setItem('pushKeyGD', data.registrationId);



});
    

      $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'Warning',
        template: 'Are you sure to close?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);



    function callAtInterval(palabra) {

    TTS.speak({
          text: palabra,
          locale: 'es-AR',
          rate: 0.75
      }, function () {
          console.log('success');
      }, function (reason) {
          console.log(reason);
      });


    }
   var promise;

     var start = function(palabra) {
      // stops any running interval to avoid two intervals running at the same time
      stop(); 
      
      // store the interval promise
      promise = $interval(callAtInterval(palabra), 2000);
    };
  
     var stop = function() { 
      $interval.cancel(promise);
    };


push.on('notification', function(data) {
console.log(data);
  //alert('Tienes una notificacion: '+data.title);
//start(data.additionalData.key1);
$rootScope.$broadcast('cambiarTxto', { palabra: data.additionalData.key1 });

});

push.on('error', function(e) {
    console.log(e.message);

});
//push final 



        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    }
  ]);
});

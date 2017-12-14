define([
  'app'
], function (app) {
  'use strict';
  // the run blocks
  app.run([
    '$ionicPlatform',
    function ($ionicPlatform) {
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

push.on('notification', function(data) {

  //alert('Tienes una notificacion: '+data.title);

console.log(data);

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

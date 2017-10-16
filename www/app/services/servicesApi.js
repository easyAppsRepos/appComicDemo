angular.module('starter.services', [])

.factory('api', function($http, $q, $window, serverConfig) {

    return {


            getProximosEventos:function(){  

            return  $http.post(serverConfig.url+'/getEventos')
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

    })


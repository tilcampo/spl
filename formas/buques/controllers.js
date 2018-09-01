'use strict';

angular.module('Buques')

.controller('BuquesControler',
    ['$http', '$scope', '$rootScope', '$location',
    function ($http, $scope, $rootScope, $location) {
		
            $http({
                method: 'GET',
                url: Urls
            }).then(function successCallback(response) {
                if (response.data.length == 1) {
                    console.log(response);
                }
                else {
                    alert("Error en usuario y/o password.");
                }

            }, function errorCallback(response) {
                alert("Error en la aplicación.");
            });
        
    }]);
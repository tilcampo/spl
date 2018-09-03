'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$http', '$scope', '$rootScope', '$location',
    function ($http, $scope, $rootScope, $location) {

        if (!sessionStorage.name) {

        }
        else {
            $location.url("/logout");
        }

        $scope.login = function () {
            $scope.loading = true;

            if ($scope.rememberMe == true) {

            }

            var Urls = "http://lvsoft.pro/logisticamovil/ws/getUsuarioLogin/" + $scope.usuario + "/" + $scope.password

            $http({
                method: 'GET',
                url: Urls
            }).then(function successCallback(response) {
                if (response.data.length == 1) {

                    sessionStorage.isUSer = response.data[0].id;
                    sessionStorage.name = response.data[0].name;
                    sessionStorage.id_company = response.data[0].id_company;
                    sessionStorage.telephone = response.data[0].telephone;
                    sessionStorage.tipo = response.data[0].tipo;
                    sessionStorage.nombre = response.data[0].nombre;
                    $scope.loading = false;
                    $location.url("/");
                  
                }
                else {
                    $scope.loading = false;
                    alert("Error en usuario y/o password.");

                }

            }, function errorCallback(response) {
                $scope.loading = false;
                alert("Error en la aplicación.");
            });
        };
    }]);
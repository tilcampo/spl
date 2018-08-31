'use strict';

angular.module('Home')

.controller('HomeController',
    ['$http', '$scope', '$rootScope', '$location',
    function ($http, $scope, $rootScope, $location) {
        
		
		
		if(!sessionStorage.name)
		{
			$scope.lblUsuario = "Invitado";	
			console.log($scope.lblUsuario);			
		}
		else{
			console.log(sessionStorage.name);
			$scope.lblUsuario = sessionStorage.name;
		}
		
		
		
		
		$scope.login = function () {
            console.log($scope.usuario);
            
            if ($scope.rememberMe == true) {

                console.log("seleccionado");
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
					$location.url("/");
                }
                else {
                    alert("Error en usuario y/o password.");
                }

            }, function errorCallback(response) {
                alert("Error en la aplicación.");
            });
        };
    }]);
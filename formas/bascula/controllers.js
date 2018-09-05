'use strict';

angular.module('Basculamodulo')

.controller('BasculaControler',
    ['$http', '$scope', '$rootScope', '$location',
    function ($http, $scope, $rootScope, $location) {

     
        $scope.validar = function () {
				
				var Urls = "http://lvsoft.pro/logisticamovil/ws/getRutaID/" + $scope.Folio ;
				$scope.loading = true;
            $http({
                method: 'GET',
                url: Urls
            }).then(function successCallback(response) {
				console.log(response.data);
				if (response.data.length == 1) {
				
				sessionStorage.FolioValido =  response.data[0].folio;
				
                    $location.url("/basculavalidar");
                
				}
				else {
				    $scope.loading = false;
                    alert("No existe ese folio en sistema.");
                }

            }, function errorCallback(response) {
                $scope.loading = false;
                alert("Error en la aplicación.");
            });
				
				
        }
        $scope.validarRuta = function () {
            vm.changeStep = function () {
                vm.contentUrl = 'formas/muelle/views/muelle.html';
            }
        }
    }

    ]);
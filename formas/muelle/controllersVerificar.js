'use strict';

angular.module('ValidaModulo')

.controller('MuelleControlerVerificar',
    ['$http', '$scope', '$rootScope', '$location',
    function ($http, $scope, $rootScope, $location) {
		
			var Urls = "http://lvsoft.pro/logisticamovil/ws/getRutaID/"+sessionStorage.FolioValido;
            $http({
                method: 'GET',
                url: Urls
            }).then(function successCallback(response) {
				console.log(response);
				if (response.data.length == 1) {
					console.log(response.data[0].folio);
					$scope.txbFolio =  parseInt(response.data[0].folio);
					$scope.txbBarco =  response.data[0].nombre;
					$scope.txbCliente =  response.data[0].NOMBRE;
					$scope.txbProducto =  response.data[0].producto;
					$scope.txbPlacas =  response.data[0].placas;
					$scope.txbECO =  response.data[0].economico;
					
					$scope.txbRemolque1 =  response.data[0].remolque_1;
					$scope.txbRemolque2 =  response.data[0].remolque_2;
					$scope.Carta =  response.data[0].carta_porte;
					$scope.Transportista =  response.data[0].transportista;
					$scope.Operador =  response.data[0].operador;
					$scope.Telefono =   parseInt(response.data[0].telefono);
					$scope.Destino =  response.data[0].origen_destino;
				}
                else {
                    alert("No existe ese folio en sistema.");
                }

            }, function errorCallback(response) {
                alert("Error en la aplicación.");
            });				
		
        $scope.validarRuta = function () {
				alert("Continuar");
				$location.url("/verificarmuelle");
            }
        
    }

    ]);
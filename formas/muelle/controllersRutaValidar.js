'use strict';
angular.module('ValidarRutaMuelle').controller('MuelleControlerGuardar', ['$http', '$scope', '$rootScope', '$location',
	function($http, $scope, $rootScope, $location) {
		
		$scope.FolioValidar = parseInt(sessionStorage.FolioValido);
		
		
        $scope.GuardarMuelle = function () {

            var fpresentado = document.getElementById("Presentacion");
            var fcargado = document.getElementById("cargado");
            

            var fecha1 = new Date(fpresentado.value);
            console.log(fecha1.toDateString());

            var fecha2 = new Date(fcargado.value);

            console.log(fecha1.getTime());
            console.log(fecha2.getTime());

            if (fecha1.getTime() > fecha2.getTime()) {
                alert("Verifica que la fecha y hora de cargado sea igual o mayor a la hora de presentacion.");
                return;            
            }



            var urls = 'http://lvsoft.pro/logisticamovil/ws/guardarVerificacionMuelle/' + $scope.FolioValidar + '/' + fpresentado.value + '/' + fcargado.value + '/' + $scope.Bodega + '/' + sessionStorage.isUSer;

            console.log(urls);

            $http({
                method: 'GET',
                url: urls
            }).then(function successCallback(response) {

                if (response.data == 1) {
                    alert("Verificación realizada.");
                }
                else {
                    alert("No se pudo almacenar o el folio ya fue verificado.");
                }


                if (response.data == 1) {
                    
                    $location.url("/");
                }


            }, function errorCallback(response) {
                alert("Error en la aplicación.");
            });

		}
	}
]);
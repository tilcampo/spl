'use strict';
angular.module('ValidarRutaBascula').controller('BasculaControlerGuardar', ['$http', '$scope', '$rootScope', '$location',
	function($http, $scope, $rootScope, $location) {
		
        $scope.ValidarPeso = function () {
            console.log("valida");
            $scope.pesoNeto = parseFloat($scope.pesoButro).toFixed(3) - parseFloat($scope.pesoTara).toFixed(3);
        }

        $scope.txbFolio = parseInt(sessionStorage.FolioValido);


        $scope.GuardarBascula = function () {

            var fhVacios = document.getElementById("fhVacio");
            var fhTaras = document.getElementById("fhTara");
            

            var fecha1 = new Date(fhVacios.value);
          

            var fecha2 = new Date(fhTaras.value);

 
            //if (fecha1.getTime() > fecha2.getTime()) {
            //    alert("Verifica que la fecha y hora de VACIO sea igual o mayor a la hora de TARA.");
            //    return;            
            //}
            var req = {
                method: 'POST',
                url: 'http://lvsoft.pro/logisticamovil/ws/saveRutabascula',
                headers: {
                    'Content-Type': undefined
                },
                data: {
                    folio: parseInt($scope.txbFolio),
                    fh_vacio: fhVacios.value,
                    fh_pesaje: fhTaras.value,
                    ticket: $scope.ticket,
                    peso_bruto: $scope.pesoButro,
                    peso_tara: $scope.pesoTara,
                    peso_neto: $scope.pesoNeto,
                    no_copia_simple: $scope.copiaSimple,
                    usuario: parseInt(sessionStorage.isUSer)
                }
            }

            $http(req).then(function (response) {
                var respuesta = response.data;

                if (response.data == "1") {

                    alert("Se han guardado los datos de BASCULA del FOLIO :" + $scope.txbFolio);

                } else {
                    alert("No se pudo agregar datos de BASCULA  del FOLIO :" + $scope.txbFolio + " ya ha sido agregada anteriormente.");
                }
                if (response.data == "1") {

                    $location.url("/");

                }

            }, function (response) {
                alert(response.data);
            });


		}
	}
]);
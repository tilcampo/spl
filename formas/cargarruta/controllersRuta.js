'use strict';

angular.module('AltaRuta')

    .controller('AltaRutaControler',
        ['$http', '$scope', '$rootScope', '$location',
            function ($http, $scope, $rootScope, $location) {
                $scope.barcosConsulta = [];
                $scope.clienteConsulta = [];
                $scope.productoConsulta = [];


                $http({
                    method: 'GET',
                    url: 'http://lvsoft.pro/logisticamovil/ws/getBuques/0'
                }).then(function successCallback(response) {
                    $scope.barcosConsulta = response.data;
                }, function errorCallback(response) {
                    alert("Error en la aplicación.");
                });




                $scope.changeBarco = function () {

                    if (Number.isInteger($scope.txbCliente) == false) {
                        $scope.txbCliente = 0;
                    }
                    else {
                        console.log("No se vaklidoo");
                    }
                    $http({
                        method: 'GET',
                        url: 'http://lvsoft.pro/logisticamovil/ws/getClientesId/' + $scope.txbCliente + '/' + $scope.txbBarco
                    }).then(function successCallback(response) {
                        $scope.clienteConsulta = response.data;
                    }, function errorCallback(response) {
                        alert("Error en la aplicación.");
                    });
                }


                $scope.changeCliente = function () {

                    if (Number.isInteger($scope.txbProducto) == false) {
                        $scope.txbProducto = 0;
                    }
                    else {
                        console.log("No se vaklidoo");
                    }

                    $http({
                        method: 'GET',
                        url: 'http://lvsoft.pro/logisticamovil/ws/getProductoClienteBuque/' + $scope.txbCliente + '/' + $scope.txbBarco + '/' + $scope.txbProducto
                    }).then(function successCallback(response) {
                        $scope.productoConsulta = response.data;
                    }, function errorCallback(response) {
                        alert("Error en la aplicación.");
                    });
                }

                $scope.guardarRuta = function () {

                    var req = {
                        method: 'POST',
                        url: 'http://lvsoft.pro/logisticamovil/ws/saveRutaMovil',
                        headers: {
                            'Content-Type': undefined
                        },
                        data: {
                            folio: parseInt($scope.txbFolio), buque: parseInt($scope.txbBarco), cliente: parseInt($scope.txbCliente),
                            producto: $scope.txbProducto, placas: $scope.txbPlacas,
                            reco: $scope.txbECO, remonque1: $scope.txbRemolque1, remolque2: $scope.txbRemolque2, rcartap: $scope.Carta,
                            rtrans: $scope.Transportista, roperador: $scope.Operador, telefono: $scope.Telefono, rdestino: $scope.Destino,
                            usuario: parseInt(sessionStorage.isUSer)
                        }
                    }

                    $http(req).then(function (response) {
                        var respuesta = response.data;

                        if (response.data == "1") {

                            alert("Se ha agregado la RUTA :" + $scope.txbFolio);
                            
                        } else {
                            alert("No se pudo agregar la RUTA :" + $scope.txbFolio+ " ya ha sido agregada anteriormente.");
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
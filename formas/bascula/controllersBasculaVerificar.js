'use strict';

angular.module('ValidaBasculaModulo')

    .controller('basculaControlerVerificar',
        ['$http', '$scope', '$rootScope', '$location',
            function ($http, $scope, $rootScope, $location) {
                $scope.barcosConsulta = [];
                $scope.clienteConsulta = [];
                $scope.productoConsulta = [];
                var Urls = "http://lvsoft.pro/logisticamovil/ws/getRutaID/" + sessionStorage.FolioValido;
                $http({
                    method: 'GET',
                    url: Urls
                }).then(function successCallback(response) {

                    if (response.data.length == 1) {

                        $scope.txbFolio = parseInt(response.data[0].folio);
                        $scope.txbBarco = response.data[0].id;
                        $scope.txbCliente = response.data[0].CVE_EXPIMP;
                        $scope.txbProducto = response.data[0].producto;
                        $scope.txbPlacas = response.data[0].placas;
                        $scope.txbECO = response.data[0].economico;

                        $scope.txbRemolque1 = response.data[0].remolque_1;
                        $scope.txbRemolque2 = response.data[0].remolque_2;
                        $scope.Carta = response.data[0].carta_porte;
                        $scope.Transportista = response.data[0].transportista;
                        $scope.Operador = response.data[0].operador;
                        $scope.Telefono = parseInt(response.data[0].telefono);
                        $scope.Destino = response.data[0].origen_destino;

                        $http({
                            method: 'GET',
                            url: 'http://lvsoft.pro/logisticamovil/ws/getBuques/' + response.data[0].id
                        }).then(function successCallback(response) {

                            $scope.barcosConsulta = response.data;
                        }, function errorCallback(response) {
                            alert("Error en la aplicación.");
                        });
                        $http({
                            method: 'GET',
                            url: 'http://lvsoft.pro/logisticamovil/ws/getClientesId/' + response.data[0].CVE_EXPIMP + '/' + response.data[0].id
                        }).then(function successCallback(response) {

                            $scope.clienteConsulta = response.data;
                        }, function errorCallback(response) {
                            alert("Error en la aplicación.");
                        });
                        $http({
                            method: 'GET',
                            url: 'http://lvsoft.pro/logisticamovil/ws/getProductoClienteBuque/' + response.data[0].CVE_EXPIMP + '/' + response.data[0].id + '/' + response.data[0].producto
                        }).then(function successCallback(response) {

                            $scope.productoConsulta = response.data;
                        }, function errorCallback(response) {
                            alert("Error en la aplicación.");
                        });
                    }
                    else {
                        alert("No existe ese folio en sistema.");
                    }

                }, function errorCallback(response) {
                    alert("Error en la aplicación.");
                });


                $scope.changeBarco = function () {

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

                    $http({
                        method: 'GET',
                        url: 'http://lvsoft.pro/logisticamovil/ws/getProductoClienteBuque/' + $scope.txbCliente + '/' + $scope.txbBarco + '/' + $scope.txbProducto
                    }).then(function successCallback(response) {
                        $scope.productoConsulta = response.data;
                    }, function errorCallback(response) {
                        alert("Error en la aplicación.");
                    });
                }
                $scope.validarRuta = function () {

                    var req = {
                        method: 'POST',
                        url: 'http://lvsoft.pro/logisticamovil/ws/updateRuta',
                        headers: {
                            'Content-Type': undefined
                        },
                        data: {
                            folio: parseInt($scope.txbFolio), buque: parseInt($scope.txbBarco), cliente: parseInt($scope.txbCliente),
                            producto: $scope.txbProducto, placas: $scope.txbPlacas,
                            reco: $scope.txbECO, remonque1: $scope.txbRemolque1, remolque2: $scope.txbRemolque2, rcartap: $scope.Carta,
                            rtrans: $scope.Transportista, roperador: $scope.txbUsuario, telefono: $scope.Telefono, rdestino: $scope.Destino
                        }
                    }

                    $http(req).then(function (response) {
                        var respuesta = response.data;
                                                
                        if (response.data.status=="OK") {

                            $location.url("/basculaguardar");
                        }

                    }, function (response) {
                        alert(response.data);
                    });


                }
            }

        ]);
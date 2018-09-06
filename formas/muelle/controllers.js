'use strict';

angular.module('Muellemodulo')

    .controller('MuelleControler',
        ['$http', '$scope', '$rootScope', '$location',
            function ($http, $scope, $rootScope, $location) {


                $scope.validar = function () {

                    $http({
                        method: 'GET',
                        url: 'http://lvsoft.pro/logisticamovil/ws/getRevisarRutaID/' + $scope.Folio
                    }).then(function successCallback(response) {

                        if (parseInt(response.data.status) == 0) {
                            alert("El FOLIO " + $scope.Folio +' ya fue VALIDADO.');
                            return;
                        }
                        else {

                            var Urls = "http://lvsoft.pro/logisticamovil/ws/getRutaID/" + $scope.Folio;
                            $scope.loading = true;
                            $http({
                                method: 'GET',
                                url: Urls
                            }).then(function successCallback(response) {
                                console.log(response.data);
                                if (response.data.length == 1) {

                                    sessionStorage.FolioValido = response.data[0].folio;

                                    $location.url("/rutavalidar");

                                }
                                else {
                                    $scope.loading = false;
                                    alert("No hay registro de RUTA para el folio " + $scope.Folio);
                                }

                            }, function errorCallback(response) {
                                $scope.loading = false;
                                alert("Error en la aplicación.");
                            });
                        }

                    }, function errorCallback(response) {
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
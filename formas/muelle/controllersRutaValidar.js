'use strict';
angular.module('ValidarRutaMuelle').controller('MuelleControlerGuardar', ['$http', '$scope', '$rootScope', '$location',
	function($http, $scope, $rootScope, $location) {
		
		$scope.FolioValidar = parseInt(sessionStorage.FolioValido);
		
		
		$scope.GuardarMuelle = function() {
			console.log($scope.FolioValidar);
			console.log($scope.Presentacion);
			console.log($scope.Cargado);
			console.log($scope.Bodega);
		}
	}
]);
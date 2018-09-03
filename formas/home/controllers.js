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

    }]);
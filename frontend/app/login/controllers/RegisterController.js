(function(namespace, undefined) {
	'use strict';

	var RegisterController = ['$scope', '$http', '$stateParams',  'cssInjector','$location', '__Login',
		function($scope, $http, $stateParams, cssInjector, $location, __Login) {

			$scope.user = {
				email: "",
				username: "",
				password: ""
			};

			$scope.register = function(){
				if($scope.user.email !== "" && $scope.user.username !== "" && $scope.user.password !== ""){
					__Login.register({
						'email': $scope.user.email,
						'username': $scope.user.username,
						'password': $scope.user.password});
				}
			};			
		}
	];
	angular.module('Login').controller('RegisterCtrl', RegisterController);

})(this);

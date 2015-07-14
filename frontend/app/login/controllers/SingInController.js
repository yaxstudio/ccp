(function(namespace, undefined) {
	'use strict';

	var SignInController = ['$scope', '$http', '$stateParams',  'cssInjector','$location', 'GlobalUser', '__Login',
		function($scope, $http, $stateParams, cssInjector, $location, GlobalUser, __Login) {
			
			$scope.user = {
				username: "",
				password: ""
			};

			$scope.signin = function(){				
				__Login.setLoginData({
					'username': $scope.user.username,
					'password': $scope.user.password});
			};			
		}
	];
	angular.module('Login').controller('SignInCtrl', SignInController);

})(this);
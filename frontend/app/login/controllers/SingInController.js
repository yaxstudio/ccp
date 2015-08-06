(function(namespace, undefined) {
	'use strict';

	var SignInController = ['$scope', '$http', '$stateParams',  'cssInjector','$location', 'GlobalUser', '__Login',
		function($scope, $http, $stateParams, cssInjector, $location, GlobalUser, __Login) {
			
			$scope.user = {
				username: {
					val: "",
					error:"",
					success:""
				},
				password: {
					val:"",
					error:"",
					success:""
				},				
			};

			$scope.signin = function(){	
				if($scope.user.username.val && $scope.user.password.val){
					if(validate_username($scope.user.username.val)){
						if(validate_password($scope.user.password.val)){
							__Login.setLoginData({
								'username': $scope.user.username.val,
								'password': $scope.user.password.val}).error(function(data){
									$scope.general_error = "User or Password is Empty";
								});
						}else{
							$scope.user.password.error = "Incorrect Password";
						}
					}else{
						$scope.user.username.error = "Incorrect username";
					}
				}else{
					$scope.general_error = "User or Password is Empty";
				}					
			};	

			var validate_username = function(username){
				if(username.length < 9){
					if(/^[0-9a-zA-Z]+$/.test(username)){						
						return true;
					}else{						
						return false;
					}
				}   

			};		

			var validate_password = function(password){
				if(password.length < 9){
					if(/^[0-9a-zA-Z]+$/.test(password)){
						return true;
					}else{
						return false;
					}
				}
			};

		}
	];
	angular.module('Login').controller('SignInCtrl', SignInController);

})(this);
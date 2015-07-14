;(function(namespace, undefined) {
    'use strict';

    var GlobalPortalServices = ['$http', 'GlobalUser', 'GlobalSettings','$rootScope', '$location','$timeout',

        function($http, GlobalUser, GlobalSettings, $rootScope, $location,$timeout) {
            var GPservices = {
                getGlobalLoggedUser: function(params) {                    
                    var loggedUser = $http({
                        'method': 'POST',                        
                        'url': GlobalSettings.apiURL + '/' + GlobalSettings.apiEndPoint + '/' + GlobalSettings.apiVersion + '/collections/auth/login',
                        params:params
                    });

                    return loggedUser;
                },
                setLoginData: function(params) {
                    var self = this;
                    var userinfo = self.getGlobalLoggedUser(params);

                    userinfo.then(function(response) {
                        console.log(response);
                        if (response.data.email === "") {
                            GlobalUser.logged = false;
                        } else {
                            GlobalUser.logged = true;
                            GlobalUser.email = response.data.email;
                            console.log(GlobalUser.email);
                            GlobalUser.user = response.data.user;
                            $location.path('/main/index');
                            $timeout(function() {
                                $rootScope.$emit('Global.UserLogin', response.data.email);
                            });
                        }                                               

                    });
                },
                setRegister: function(params){
                    var register = $http({
                        'method': 'POST',                        
                        'url': GlobalSettings.apiURL + '/' + GlobalSettings.apiEndPoint + '/' + GlobalSettings.apiVersion + '/collections/auth/register',
                        params:params
                    });
                    return register;
                },
                register: function(params){
                    var self = this;
                    var user = self.setRegister(params);
                    user.then(function(response){
                        if (response.data.email === "") {
                            GlobalUser.logged = false;
                        } else {
                            GlobalUser.logged = true;
                            GlobalUser.email = response.data.email;
                            GlobalUser.user = response.data.user;
                            $location.path('/main/index');
                            $timeout(function() {
                                $rootScope.$emit('Global.UserLogin', response.data.email);
                            });
                        }  
                    });
                }
            };
            return GPservices;
        }
    ];
    angular.module('Login').service('__Login', GlobalPortalServices);

}(this));

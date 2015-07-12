;(function(namespace, undefined) {
    'use strict';

    var GlobalPortalServices = ['$http', 'GlobalUser', 'GlobalSettings','$rootScope', '$location','$timeout',

        function($http, GlobalUser, GlobalSettings, $rootScope, $location,$timeout) {
            var GPservices = {
                getGlobalLoggedUser: function(params) {                    
                    var loggedUser = $http({
                        'method': 'GET',                        
                        'url': GlobalSettings.apiURL + '/CCPLoginWS.php'
                        //'url': 'https://master-dot-api-dot-liugateway.appspot.com/_ah/api/global/v1/collections/SignatureProgram/business-suite-en/resources'
                    });

                    return loggedUser;
                },
                setLoginData: function(params) {
                    var self = this;
                    var userinfo = self.getGlobalLoggedUser();

                    userinfo.then(function(response) {
                        console.log(response);
                        if (response.data.email === "") {
                            GlobalUser.logged = false;
                        } else {
                            GlobalUser.logged = true;
                        }
                        
                        GlobalUser.email = response.data.email;                                               

                        $timeout(function() {
                            $rootScope.$emit('Global.UserLogin', response.data.email);
                        });

                    });
                }
            };
            return GPservices;
        }
    ];
    angular.module('Login').service('__Login', GlobalPortalServices);

}(this));

;(function(namespace, undefined) {
    'use strict';

    var LinksServices = ['$http', 'GlobalUser', 'GlobalSettings','$rootScope', '$location','$timeout',

        function($http, GlobalUser, GlobalSettings, $rootScope, $location,$timeout) {
            var GPservices = {
                SaveLinks: function(params) {                    
                    var save = $http({
                        'method': 'POST',                        
                        'url': GlobalSettings.apiURL + '/' + GlobalSettings.apiEndPoint + '/' + GlobalSettings.apiVersion + '/collections/save_links',
                        'data': JSON.stringify(params),
                        'contentType' : "application/json",
                        'dataType': 'json'
                    });

                    return save;
                },
                RequestPublicLinks: function(params) {                    
                    var request = $http({
                        'method': 'POST',
                        'url': GlobalSettings.apiURL + '/' + GlobalSettings.apiEndPoint + '/' + GlobalSettings.apiVersion + '/collections/links/public/list',
                        'data': JSON.stringify(params),
                        'contentType' : "application/json",
                        'dataType': 'json'
                    });

                    return request;
                },
                RequestPrivateLinks: function(params) {
                    var request = $http({
                        'method': 'POST',
                        'url': GlobalSettings.apiURL + '/' + GlobalSettings.apiEndPoint + '/' + GlobalSettings.apiVersion + '/collections/links/private/list',
                        'data': JSON.stringify(params),
                        'contentType' : "application/json",
                        'dataType': 'json'
                    });

                    return request;
                }
            };
            return GPservices;
        }
    ];
    angular.module('Main').service('__LinkService', LinksServices);

}(this));

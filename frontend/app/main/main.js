;(function(namespace, undefined) {
    'use strict';


    var Main = angular.module('Main', ['ui.router']);

    Main.config(function($stateProvider) {

        $stateProvider.state('main', {
            url: '/main',
            views: {
                'header': {
                    templateUrl: 'app/common/views/header.html',
                    controller: 'HeaderCtrl'
                },
                'container':{
                    templateUrl: 'app/main/views/container-main.html'
                },
                'footer':{
                    templateUrl: 'app/common/views/footer.html'
                }
            }
        });        

        $stateProvider.state('main.index', {
            url: '/index',
            views: {                
                'container-inside':{
                    templateUrl: 'app/main/views/textboxes.html',
                    controller: 'LinksFormCtrl'
                },
                'footer':{
                    templateUrl: 'app/common/views/footer.html'
                }
            }
        });
    });

}(this));

;(function(namespace, undefined) {
  'use strict';

  var ModalWindowFactory = ['$rootScope', function ($rootScope) {
        var SaveLinks = function () {           
            $rootScope.$broadcast('save:links');
        };

        return {
            SaveLinks: SaveLinks
        };
    }
  ];
  angular.module('Shared').service('__HeaderActions', ModalWindowFactory);

}(this));
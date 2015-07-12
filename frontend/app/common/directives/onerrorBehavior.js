(function(namespace, undefined) {
    'use strict';
    BackOffice.directive('errSrc', [function() {

        return {
            link: function(scope, element, attrs) {

                scope.$watch(function() {
                    return attrs['ngSrc'];
                }, function(value) {
                    if (!value) {
                        element.attr('src', attrs.errSrc);
                    }
                });

                element.bind('error', function() {
                   element.attr('src', attrs.errSrc);
                });
            }
        };

    }]);



})(this);
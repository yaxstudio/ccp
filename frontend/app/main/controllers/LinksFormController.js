(function(namespace, undefined) {
	'use strict';

	var LinksFormController = ['GlobalUser', '$scope', '$http', '$stateParams',  'cssInjector','$location', '__Login', '$rootScope', '__LinkService',
		function(GlobalUser, $scope, $http, $stateParams, cssInjector, $location, __Login, $rootScope, __LinkService) {
			$('.collapsible').collapsible({
      			accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		    });

		    $scope._links = {
				link_1: "",
				link_2: "",
				link_3: "",
				link_4: "",
				link_5: "",
				link_6: "",
				link_7: "",
				link_8: "",
				link_9: "",
				link_10: ""
			};

		    var public_link_list = __LinkService.RequestPublicLinks({
		    	'user': GlobalUser.user
		    });

		    public_link_list.success(function(data){		    	
		    	$scope._links = {
					link_1: data.link_1,
					link_2: data.link_2,
					link_3: data.link_3,
					link_4: data.link_4,
					link_5: data.link_5
				};
		    }).error(function(data){
		    	console.log('A error ocurred');
		    });    

			$scope.$on('save:links', function(event) {                				
                __LinkService.SaveLinks({
                	'link_1': $scope._links.link_1,
                	'link_2': $scope._links.link_2,
                	'link_3': $scope._links.link_3,
                	'link_4': $scope._links.link_4,
                	'link_5': $scope._links.link_5,
                	'link_6': $scope._links.link_6,
                	'link_7': $scope._links.link_7,
                	'link_8': $scope._links.link_8,
                	'link_9': $scope._links.link_9,
                	'link_10': $scope._links.link_10,
                	'user':  GlobalUser.user          	
                });
            });					
		}
	];
	angular.module('Main').controller('LinksFormCtrl', LinksFormController);

})(this);
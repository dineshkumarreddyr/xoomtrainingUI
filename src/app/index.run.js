(function() {
	'use strict';

	angular
	.module('xoomwebapp')
	.run(xoomConfig);

	/** @ngInject */
	function xoomConfig($rootScope, $location, $state, $timeout, $cookies, $xtAppConfig, $managecookies) {
		var isSessionExist = false;
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if(toState.name.toLowerCase()==='home.checkout' && !$managecookies.bind()){
			$timeout(function () {
					$state.go('home.offerings');
				});	
			}
		});
        // For Setting up scroll position to top
        $rootScope.$on('$stateChangeSuccess', function () {
        	document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    };

})();

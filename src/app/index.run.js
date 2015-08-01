(function() {
	'use strict';

	angular
	.module('xoomwebapp')
	.run(xoomConfig);

	/** @ngInject */
	function xoomConfig($rootScope, $location, $state, $timeout, $cookies, $xtAppConfig, $managecookies) {
		var isSessionExist = false;
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if (!$managecookies.bind() && toState.name.toLowerCase() !== 'home.offerings' &&
				toState.name.toLowerCase() !== 'home.forgotpassword' && toState.name.toLowerCase()!=='about')
				$timeout(function () {
					$state.go('home.offerings');
				});
		});
        // For Setting up scroll position to top
        $rootScope.$on('$stateChangeSuccess', function () {
        	document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    };

})();

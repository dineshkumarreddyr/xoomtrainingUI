(function(){
	"use strict";

	angular
	.module('xoomwebapp')
	.directive('signupModal', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				scope.dismiss = function () {
					element.modal('hide');
				};

				scope.toggle = function () {
					element.modal('show');
				};
			}
		}
	});
})();
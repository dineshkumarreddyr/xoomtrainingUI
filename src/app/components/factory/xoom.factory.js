// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function(){
	"use strict";

	angular.module('xoomwebapp')
	.factory('$managecookies', ['$http', '$cookies', '$xtAppConfig', function ($http, $cookies, $xtAppConfig) {
		return {
			bind: function () {
				if ($cookies.get('email') != undefined && $cookies.get('email') != null) {
					$xtAppConfig.fullname = $cookies.get('fullname');
					$xtAppConfig.email = $cookies.get('email');
					$xtAppConfig.country = $cookies.get('country');
					$xtAppConfig.userid = $cookies.get('userid');
					$xtAppConfig.cartitemCount = $cookies.get('cartitems');
					return true;
				}
				return false;
			},
			remove: function () {
				if ($cookies.get('email') != undefined && $cookies.get('email') != null) {
					$cookies.remove('fullname');
					$cookies.remove('email');
					$cookies.remove('country');
					$cookies.remove('cartitems');
					$cookies.remove('userid')
					$xtAppConfig.fullname = null;
					$xtAppConfig.email = null;
					$xtAppConfig.country = null;
					$xtAppConfig.cartitemCount = 0;
					$xtAppConfig.userid = 0;
				}
			},
			zeroCartItems:function(){
				if($cookies.get('cartitems')!=undefined && $cookies.get('cartitems')!=null){
					$cookies.remove('cartitems');
					$xtAppConfig.cartitemCount = 0;
				}
			}
		};
	}]);
})();
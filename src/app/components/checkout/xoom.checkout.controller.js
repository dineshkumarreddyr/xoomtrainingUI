// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function(){
	"use strict";

	angular
	.module('xoomwebapp')
	.controller('CheckoutController',checkoutController);

	function checkoutController($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams, $state, $filter, $log,$managecookies) {


		$scope.cartDetail = [];

        //Get Cart details
        $http.post($xtAppConfig.apiUrl + 'cartdetails', { userid: $xtAppConfig.userid }).success(function (res, status, headers, conf) {
        	if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
        		$scope.cartDetail = res.records;
        	}
        }).error(function (res, status, headers, conf) {
        	$log.error(res);
        });


        //Remove cart item
        $scope.removeCartItem = function (index,id) {
        	var data = {};
        	try {
        		data.userid = $xtAppConfig.userid;
        		data.cartid = id;
        		$http.post($xtAppConfig.apiUrl + 'removeitem', data).success(function (res, status, headers, conf) {
        			if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
        				$scope.cartDetail.splice(index, 1);
        				$scope.$parent.updateCartItems(parseInt($xtAppConfig.cartitemCount)-1);
        			}
        		}).error(function (res, status, headers, conf) {

        		});
        	}
        	catch (e) {
        		$log.error(e.message);
        	}
        }

    }

})();
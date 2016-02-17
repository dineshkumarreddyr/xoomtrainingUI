// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function(){
	"use strict";

	angular.module('xoomwebapp')
	.controller('OfferingsController',offeringsController);
	
	function offeringsController($scope, $http, $xtAppConfig, $xtAppVariables, $stateParams,$SpinnerService,$timeout,$state) {

        //Default array for course list
        $scope.allCourses = [];

        // Default Spinner On for loading Data
        $SpinnerService.busyOn();

        //Default bindings for course list
        $http.get($xtAppConfig.apiUrl + 'courselist').success(function (res, status, headers, conf) {
        	if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
        		$scope.allCourses = res.records;
        		$timeout(function(){
        			$SpinnerService.busyOff();
        		},500);
        	}
        }).error(function (res, status, headers, conf) {
        	$scope.allCourses = [];
        	$SpinnerService.busyOff();
        });

        $scope.indian = function(){
            return $xtAppConfig.country.indexOf('India')>-1 ? true : false;
        }


        $scope.keyword = function(e){
            if(e && e.which===13){
                $state.go('home.list',{s:$scope.searchword});
            }
        }

        $scope.indian = true;
        $scope.othercountry = true;

        $scope.$parent.$watch('userindian',function(v){
            if(v!=undefined){
                if(v){
                    $scope.indian = true;
                    $scope.othercountry = false;
                }
                else{
                    $scope.indian = false;
                    $scope.othercountry = true;
                }
            }
        });
    }
})();
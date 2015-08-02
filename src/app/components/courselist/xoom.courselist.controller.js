(function(){
	"use strict";

	angular
	.module('xoomwebapp')
	.controller('CourseListController',courselistController);

	function courselistController($scope,$http,$xtAppConfig,$log){

		$scope.allCourses = [];
		$scope.allCourseNames = [];
		// Scope - Default page count
		var pagesize = 1;
		var widgetperPage = 8;

		$scope.paginationCount = function(){
			return widgetperPage*pagesize;
		};

		$scope.hasItem = function(){
			return pagesize < ($scope.allCourses.length/widgetperPage);
		};

		$scope.showmore = function(){
			pagesize = pagesize+1;
		};

		$scope.resetPagination = function(){
			pagesize = 1;
			widgetperPage = 8;
		}

		function init(){
			this.getAllCourses = function(){
				$http.get($xtAppConfig.apiUrl+'courselist').success(function(res,status){
					if(status!=undefined && status===200){
						$scope.allCourses = res.records;
						$scope.allCourseNames = res.records;
					}
				}).error(function(res,status){
					$log.error(status+" - "+res);
				});
			}
		};
		(new init()).getAllCourses();
	}
})();
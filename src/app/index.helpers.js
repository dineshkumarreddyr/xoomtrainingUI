// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function(){
	"use strict";

	angular
	.module('xoomwebapp')
	.value('$xtAppConfig',{
		apiUrl: 'http://54.69.43.76:9545/',
		fullname: '',
		email: '',
		country: '',
		userid: 0,
		cartitemCount: 0
	});
})();
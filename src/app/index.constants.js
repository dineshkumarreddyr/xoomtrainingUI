// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function() {
	'use strict';

	angular
	.module('xoomwebapp')
	.constant('$xtAppVariables', {
		accountSuccess: "An email verification mail has been sent to your provided address. Please check your inbox",
		accountExists: "User already registered with the provided email address. Please try sign in",
		accountMandatory: "Please fill all the mandatory fields",
		apiFail: "OOPS! Something went wrong. Sorry for inconvenience.",
		noLogin: "Login Failed. Please check username and password.",
		noEmail: "Provided email address not registed with us. Please check and re-enter the registered email address",
		sendLink: "A password change link has been sent to your registered email address. Please check your inbox",
		noPassmatch: "Password and confirm are not same.Please verify your password."
	});
})();

// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function() {
  'use strict';

  angular
  .module('xoomwebapp')
  .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $xtAppConfig, $xtAppVariables, $cookies, $managecookies, $SpinnerService, $state, $log) {
    //Cart items
    $scope.cartItems = $xtAppConfig.cartitemCount;

    $scope.updateCartItems = function (count) {
      try {
        $cookies.put('cartitems', count);
        $scope.cartItems = $xtAppConfig.cartitemCount = $cookies.get('cartitems');
      }
      catch (e) {
        $log.error(e.message);
      }
    };
    $scope.accountShow = false;
    $scope.msgClass = "alert alert-success";
    $scope.alertOperation = { alertDisplay: false, class: 'alert alert-success', message: '' };

    $scope.countryitems = [];


    $scope.status = {
      isopen: false
    };

    $scope.toggled = function (open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };


    $http.get($xtAppConfig.apiUrl + 'countrylist').success(function (res, status, headers, conf) {
      if (res !== undefined && res.status !== undefined && res.status.indexOf('success') > -1) {
        $scope.countryitems = res.records;
      }
    }).error(function (res, status, headers, conf) {
      console.log(res);
    });


    var fnUseraction = function () {
      if ($xtAppConfig.fullname !== undefined && $xtAppConfig.fullname !== null && $xtAppConfig.fullname !== '') {
        $scope.userloggedin = true;
        $scope.fullname = $xtAppConfig.fullname;
      }
    };
    fnUseraction();


    $scope.isSignupValid = function () {
      if ($scope.firstName !== undefined && $scope.firstName !== null &&
        $scope.LastName !== undefined && $scope.LastName !== null &&
        $scope.emailAddress !== null && $scope.emailAddress !== undefined &&
        $scope.userPassword !== undefined && $scope.userPassword !== null &&
        $scope.mobileNumber !== undefined && $scope.mobileNumber !== null &&
        $scope.usercountry !== undefined && $scope.usercountry !== null){
        return true;
    }
    return false;
  };
  var validatePassword = function () {
    if ($scope.userPassword === $scope.confirmPassword){
      return true;
    }
    return false;
  };

  $scope.signup = function () {
    var data = {};
                // TurnOn Spinner
                $SpinnerService.busyOn();
                try {
                  if ($scope.isSignupValid()) {
                    if (!validatePassword()) {
                      $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.noPassmatch };
                            // TurnOff Spinner
                            $SpinnerService.busyOff();
                            return;
                          }
                          data.firstname = $scope.firstName;
                          data.lastname = $scope.LastName;
                          data.email = $scope.emailAddress;
                          data.userpassword = $scope.userPassword;
                          data.phonenumber = $scope.mobileNumber;
                          if ($scope.countryitems.length > 0) {
                            var item = _.filter($scope.countryitems, function (e) {
                              return e.countryid === $scope.usercountry;
                            });
                            if (item !== undefined){
                              data.country = item[0].countryname;
                            }
                          }
                          else{
                            data.country = $scope.usercountry;
                          }
                          if (data.country != null && data.country.indexOf('India') > -1){
                            data.userindian = 1;
                          }
                          else{
                            data.userindian = 0;
                          }
                          data.username = $scope.emailAddress;
                          $http.post($xtAppConfig.apiUrl + 'signup', data).success(function (res, status, headers, config) {
                            if (res !== undefined && res.status !== undefined && res.status.indexOf('success') > -1) {
                              $scope.alertOperation = { alertDisplay: true, class: 'alert alert-success', message: $xtAppVariables.accountSuccess };
                                // TurnOff Spinner
                                $SpinnerService.busyOff();
                              }
                              else if (res != undefined && res.status != undefined && res.status.indexOf('error') > -1) {
                                switch (res.ecode) {
                                  case 'e1':
                                  $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.accountExists };
                                        // TurnOff Spinner
                                        $SpinnerService.busyOff();
                                        break;
                                      }
                                    }
                                  }).error(function (res, status, headers, config) {
                                    $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.apiFail };
                            // TurnOff Spinner
                            $SpinnerService.busyOff();
                          });
                                }
                                else {
                                  $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.accountMandatory };
                        // TurnOff Spinner
                        $SpinnerService.busyOff();
                      }
                    }
                    catch (e) {
                      $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.apiFail };
                    // TurnOff Spinner
                    $SpinnerService.busyOff();
                  }
                }

                $scope.signin = function () {
    // TurnOn Spinner
    $SpinnerService.busyOn();
    var data = {};
    try {
      if ($scope.isLoginValid()) {
        data.username = $scope.loginUserName;
        data.userpassword = $scope.loginPassword;
            //API Call
            $http.post($xtAppConfig.apiUrl + 'signin', data).success(function (res, status, headers, conf) {
              if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
                    //Storing the values to $cookies (user session management)
                    $cookies.put('fullname', res.records[0].xtfullname);
                    $cookies.put('email', res.records[0].xtuseremail);
                    $cookies.put('country', res.records[0].xtusercountry);
                    $cookies.put('userid', res.records[0].xtuserid);
                    //Storing the data to local variables
                    $managecookies.bind();
                    //Sign in Fn
                    fnUseraction();
                    //Check for cart count
                    fnCheckcartcount();
                    // Close Popup
                    $scope.dismiss();
                    // TurnOff Spinner
                    $SpinnerService.busyOff();
                  }
                  else if (res != undefined && res.status != undefined && res.status.indexOf('error') > -1) {
                    switch (res.ecode) {
                      case 'e2':
                      $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.noLogin };
                            // TurnOff Spinner
                            $SpinnerService.busyOff();
                            break;
                            case 'e3':
                            $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.apiFail };
                            // TurnOff Spinner
                            $SpinnerService.busyOff();
                            break;
                          }
                        }

                      }).error(function (res, status, headers, conf) {
                        $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.apiFail };
                // TurnOff Spinner
                $SpinnerService.busyOff();
              });
                    }
                    else {
                      $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: $xtAppVariables.accountMandatory };
            // TurnOff Spinner
            $SpinnerService.busyOff();
          }
        } catch (exception) {
          $scope.alertOperation = { alertDisplay: true, class: 'alert alert-danger', message: exception.message };
        // TurnOff Spinner
        $SpinnerService.busyOff();
      }
    }

    //Check cart count
    var fnCheckcartcount = function () {
      var data = {};
      try {
        data.userid = $xtAppConfig.userid;
        $http.post($xtAppConfig.apiUrl + 'cartcount', data).success(function (res, status, headers, conf) {
          if (res != undefined && res.status != undefined && res.status.indexOf('success') > -1) {
            $scope.updateCartItems(res.records[0].cartItemscount);
          }
        }).error(function (res, status, headers, conf) {
          $log.error(res);
        });
      }
      catch (e) {
        $log.warn(e.message);
      }
    }

    //Validation for login form
    $scope.isLoginValid = function () {
      if ($scope.loginUserName != undefined && $scope.loginUserName != null && $scope.loginPassword != undefined && $scope.loginPassword != null)
        return true;
      return false;
    }

    //Sign Out
    $scope.signout = function () {
      try {
        $managecookies.remove();
        $state.reload();
      }
      catch (e) {
        console.log('Went wrong with ' + e.message);
      }
    }

    //For Checkout Page
    $scope.checkout = function (count) {
      try {
        if (count != undefined && count > 0)
          $state.go('home.checkout');
        else
          $scope.toggle();
      } catch (e) {
        $log.error(e.message);
      }
    }
  }
})();

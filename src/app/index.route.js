(function() {
  'use strict';

  angular
  .module('xoomwebapp')
  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider,$locationProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .state('home.offerings',{
      url:'/offerings',
      templateUrl:'app/components/offerings/xoom.offerings.html',
      controller:'OfferingsController'
    })
    .state('home.list',{
      url:'/courses?s',
      templateUrl:'app/components/courselist/xoom.list.html',
      controller:'CourseListController'
    })
    .state('home.detail',{
      url:'/coursedetails/:courseId',
      templateUrl:'app/components/coursedetail/xoom.detail.html',
      controller:'CourseDetailController'
    })
    .state('home.checkout',{
      url:'/checkout',
      templateUrl:'app/components/checkout/xoom.checkout.html',
      controller:'CheckoutController'
    })
    .state('home.myaccount',{
      url:'/myaccount',
      templateUrl:'app/components/useraccount/xoom.useraccount.html',
      controller:'UserAccountController'
    })
    .state('home.forgotpassword',{
      url:'/forgotpassword',
      templateUrl:'app/components/forgotpassword/xoom.forgotpassword.html',
      controller:'ForgotPasswordController'
    })
    .state('about',{
      url:'/aboutus',
      templateUrl:'app/components/company/xoom.about.html'
    });

    $urlRouterProvider.otherwise('/home/offerings');
    $locationProvider.html5Mode(true).hashPrefix('!');
  }

})();

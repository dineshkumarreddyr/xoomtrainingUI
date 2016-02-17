(function() {
  'use strict';

  angular
    .module('xoomwebapp')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

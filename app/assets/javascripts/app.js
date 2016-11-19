(function(){
  'use strict';
  var reciPlease  = angular.module('reciPlease', ['ui.router', 'templates', 'Devise', 'simplePagination', 'ngMessages', 'angular.filter', 'ui.bootstrap', 'ngFlash', 'ngAnimate'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }]);
}());
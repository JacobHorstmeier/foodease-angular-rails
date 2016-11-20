(function(){
  'use strict';
  var foodEase  = angular.module('foodEase', ['ui.router', 'templates', 'Devise', 'simplePagination', 'ngMessages', 'angular.filter', 'ui.bootstrap', 'ngFlash', 'ngAnimate'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }]);
}());
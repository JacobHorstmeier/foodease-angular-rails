(function(){
  'use strict';
  var reciPlease  = angular.module('reciPlease', ['ui.router', 'templates', 'Devise', 'simplePagination', 'ngMessages'])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  });
}());
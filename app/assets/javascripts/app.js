(function(){
  'use strict';
  var reciPlease  = angular.module('reciPlease', ['ui.router', 'templates', 'Devise'])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  //   $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  //   $httpProvider.defaults.headers.common["Accept"] = "application/json";
  //   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  });
}());
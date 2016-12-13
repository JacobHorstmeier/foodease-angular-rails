(function(){

angular
  .module('foodEase')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'SearchController as vm'
      })
      .state('cookbook', {
        url: '/cookbook',
        templateUrl: 'views/cookbook.html',
        controller: 'CookbookController as vm',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthController',
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'AuthController',
      })
      .state('shoppingList', {
        url: '/shopping-list',
        templateUrl: 'views/shoppingList.html',
        controller: 'ShoppingListController as vm'
      })
    $urlRouterProvider.otherwise('/search');
  }])
}())
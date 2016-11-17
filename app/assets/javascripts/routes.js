(function(){

angular
  .module('reciPlease')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('home.search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'SearchController as vm'
      })
      .state('home.search.recipe', {
        url: '/recipe',
        templateUrl: 'views/recipe.html',
        require: '^vm'   

      })
      .state('home.cookbook', {
        url: '/cookbook',
        templateUrl: 'views/cookbook.html',
        controller: 'CookbookController as vm',
      })
      .state('home.cookbook.recipe', {
        url: '/recipe',
        templateUrl: 'views/recipe.html',
        require: '^vm'   
      })
      .state('home.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthController',
        // onEnter: function($state, Auth){
        //   if (Auth._currentUser){$state.go('home.search')};
        // }
      })
      .state('home.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'AuthController',
        // onEnter: function($state, Auth) {
        //   if (Auth._currentUser){$state.go('home.search')};
        // }
      })
      .state('home.shoppingList', {
        url: '/shopping-list',
        templateUrl: 'views/shoppingList.html',
        controller: 'ShoppingListController as vm'
      })
    $urlRouterProvider.otherwise('/search/recipe');
  }])
}())
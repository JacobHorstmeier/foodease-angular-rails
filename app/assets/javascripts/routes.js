(function(){

angular
  .module('foodEase')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      // .state('home', {
      //   templateUrl: 'views/home.html',
      //   controller: 'HomeController'
      // })
      .state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'SearchController as vm'
      })
      .state('search.recipe', {
        url: '/recipe',
        templateUrl: 'views/recipe.html',
        require: 'RecipeController'   

      })
      .state('cookbook', {
        url: '/cookbook',
        templateUrl: 'views/cookbook.html',
        controller: 'CookbookController as vm',
      })
      .state('cookbook.recipe', {
        url: '/recipe',
        templateUrl: 'views/recipe.html',
        require: 'RecipeController'   
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthController',
        // onEnter: function($state, Auth){
        //   if (Auth._currentUser){$state.go('home.search')};
        // }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'AuthController',
        // onEnter: function($state, Auth) {
        //   if (Auth._currentUser){$state.go('home.search')};
        // }
      })
      .state('shoppingList', {
        url: '/shopping-list',
        templateUrl: 'views/shoppingList.html',
        controller: 'ShoppingListController as vm'
      })
    $urlRouterProvider.otherwise('/search/recipe');
  }])
}())
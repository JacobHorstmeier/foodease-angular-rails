(function(){

angular
  .module('reciPlease')
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as home'
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
      // .state('home.search.recipe', {
      //   url: '/recipe/:id',
      //   templateUrl: 'views/recipe.html',
      //   controller: 'RecipeController as recipe',
      //   resolve: {
      //     recipe: function($stateParams, SearchService){
      //       return SearchService.getRecipe($stateParams.id)
      //     }
      //   }      
      // })
      // .state('menu', {
      //   url: '/menu',
      //   templateUrl: 'some/template.html',
      //   controller: 'MenuController as menu'
      // })
      // .state('menu.recipe', {
      //   url: '/recipe/:id'
      //   templateUrl: 'some/template.html',
      //   controller: 'MenuRecipeController as menuRecipe',
      //   resolve: function($stateParams, RecipeService){
      //     return RecipeService.getRecipe($stateParams.id);
      //   }
      // })
      // .state('shoppingList', {
      //   url: '/shopping-list',
      //   templateUrl: 'some/template.html',
      //   controller: 'ShoppingListController as shoppingList'
      // })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'some/template.html',
      //   controller: 'LoginController as login'
      // })
      // .state('signup', {
      //   url: '/signup',
      //   templateUrl: 'some/template.html',
      //   controller: 'SignupController as signup'
      // })
    $urlRouterProvider.otherwise('/search');
  })
}())
(function(){

angular
  .module('reciPlease')
  .config(function($stateProvider, $urlRouterProvider){
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
      .state('home.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthController',
        onEnter: function($state, Auth){
          Auth.currentUser().then(function(){
            $state.go('home.search')
          })
        }
      })
      .state('home.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'AuthController',
        onEnter: function($state, Auth) {
          Auth.currentUser().then(function(){
            $state.go('home.search');
          });
      }
      })
      .state('home.cookbook', {
        url: '/cookbook/:userId',
        templateUrl: 'views/cookbook.html',
        controller: 'CookbookController as vm',
        resolve: {
          user: function($state, Auth){
            debugger;
            return Auth._currentUser || $state.go('home.search')
            // Auth.currentUser().then(function(user){
            //   return user;
            // }, function(error){
            //   $state.go('home.search');
            // });
          }
        }
      })
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
    // $urlRouterProvider.otherwise('/search');
  })
}())
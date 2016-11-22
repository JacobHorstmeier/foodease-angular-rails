(function(){
  function CookbookController(UserService, $scope, $rootScope, Pagination, CookbookService, RecipeFactory, Auth) {
    var ctrl = this
    // StateService.state = $state.current.name
    // debugger;
    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
      })
    }


    $scope.recipe = RecipeFactory.recipe;

    $scope.cookbookRecipes = CookbookService.recipes;
    
    ctrl.showCookbookRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    $scope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'CookbookService', 'RecipeFactory', 'Auth']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
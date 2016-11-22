(function(){
  function CookbookController(Auth, $scope, $rootScope, Pagination, CookbookService, $state, RecipeFactory) {
    var ctrl = this
    $rootScope.state = $state.current.name
    $scope.recipe = RecipeFactory.recipe;

    $scope.cookbookRecipes = CookbookService.recipes;
    
    ctrl.showCookbookRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    $rootScope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }

    $rootScope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      CookbookService.removeFromCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'CookbookService', '$state', 'RecipeFactory']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
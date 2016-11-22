(function(){
  function CookbookController(Auth, $scope, $rootScope, Pagination, CookbookService, RecipeFactory) {
    var ctrl = this
    // StateService.state = $state.current.name
    // debugger;
    $scope.recipe = RecipeFactory.recipe;

    $scope.cookbookRecipes = CookbookService.recipes;
    
    ctrl.showCookbookRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    $scope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      CookbookService.removeFromCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          $scope.cookbookRecipes = user.cookbook.recipes;
        })
    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'CookbookService', 'RecipeFactory']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
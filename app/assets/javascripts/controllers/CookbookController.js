(function(){
  function CookbookController(Auth, $scope, $rootScope, Pagination, CookbookService, $state, RecipeService) {
    var ctrl = this
    $rootScope.state = $state.current.name
    $scope.recipe = RecipeService.recipe;
    
    if($rootScope.user){
      $rootScope.cookbookRecipes = $rootScope.user.cookbook.recipes
    } else {
      Auth.currentUser().then(function(user){
        $rootScope.user = user
        $rootScope.cookbookRecipes = $rootScope.user.cookbook.recipes
      })
    }

    ctrl.showCookbookRecipe = function(recipe){

      $rootScope.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    $rootScope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook($rootScope.user.cookbook.id, recipe);
    }

    $rootScope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      CookbookService.removeFromCookbook($rootScope.user.cookbook.id, recipe);
    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'CookbookService', '$state', 'RecipeService']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
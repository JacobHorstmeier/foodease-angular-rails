(function(){
  function CookbookController(Auth, $scope, $rootScope, Pagination, RecipeService, $state) {
    var ctrl = this
    $rootScope.state = $state.current.name
    
    if($rootScope.user){
      $rootScope.cookbookRecipes = $rootScope.user.cookbook.recipes
    } else {
      Auth.currentUser().then(function(user){
        $rootScope.user = user
        $rootScope.cookbookRecipes = $rootScope.user.cookbook.recipes
      })
    }

    ctrl.showCookbookRecipe = function(recipe){
      
      $rootScope.recipe = RecipeService.alreadyInCookbook(recipe);
    }

    $rootScope.addRecipe = function(recipe){
      recipe.bookmarked = true
      if($rootScope.recipe.label == recipe.label) {
        $rootScope.recipe.bookmarked = true;
      }
      RecipeService.addToCookbook($rootScope.user.cookbook.id, recipe);
    }

    $rootScope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      // debugger;
      if($rootScope.recipe.label == recipe.label) {
        $rootScope.recipe.bookmarked = false;
        ctrl.showCookbookRecipe(recipe)
      }
      RecipeService.removeFromCookbook($rootScope.user.cookbook.id, recipe);

    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'RecipeService', '$state']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
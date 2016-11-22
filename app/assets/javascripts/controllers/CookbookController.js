(function(){
  function CookbookController(Auth, $scope, CookbookService, RecipeFactory, UserService, GlobalListService) {
    var ctrl = this

    var updateList = function(user){
      $scope.user = user
      $scope.cookbookRecipes = user.cookbook.recipes;
    }

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        updateList(GlobalListService.updateLists(user))
      })
    } else {
      updateList(GlobalListService.updateLists(UserService.user))
    }

    $scope.recipe = RecipeFactory.recipe;

    ctrl.showCookbookRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    $scope.addRecipe = function(recipe){
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
          recipe.bookmarked = true
        })
    }

    $scope.removeRecipe = function(recipe){
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
          recipe.bookmarked = false;

        })
    }
  }

  CookbookController.$inject = ['Auth', '$scope', 'CookbookService', 'RecipeFactory', 'UserService', 'GlobalListService']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
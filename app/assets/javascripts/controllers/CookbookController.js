(function(){
  function CookbookController(UserService, $scope, $rootScope, Pagination, CookbookService, RecipeFactory, Auth, ShoppingListService) {
    var ctrl = this

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
        updateLists(user)
      })
    } else {
      updateLists(UserService.user)
    }

    $scope.recipe = RecipeFactory.recipe;

    ctrl.showCookbookRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }

    function updateLists(user){
      $scope.cookbookRecipes = CookbookService.recipes = user.cookbook.recipes;
      CookbookService.ingredients = user.cookbook.ingredients;
      ShoppingListService.items = user.shoppingList.ingredients;
    }

    $scope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateLists(user)
        })
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false;
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateLists(user)
        })
    }
  }

  CookbookController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'CookbookService', 'RecipeFactory', 'Auth', 'ShoppingListService']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
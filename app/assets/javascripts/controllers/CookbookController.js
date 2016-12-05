(function(){
  function CookbookController($scope, CookbookService, RecipeFactory, UserService, GlobalListService, ShoppingListService, Auth) {

///////// DECLARATIONS /////////

    var ctrl = this

    $scope.$on('updateList', function(data){
      debugger;
    })

    var updateList = function(user){
      $scope.user = user
      $scope.cookbookRecipes = user.cookbook.recipes;
      if (RecipeFactory.recipe){
        $scope.recipe = updateIngredients(RecipeFactory.recipe)
      }
    }

    var updateIngredients = function(recipe){
      recipe.ingredients.forEach(function(ingredient){
        ingredient.added = false;
        UserService.user.shoppingList.ingredients.forEach(function(item){
          if(item.food === ingredient.food){
            ingredient.added = true;
          }
        })
      })
      return recipe
    }

    ctrl.showCookbookRecipe = function(recipe){
      updateIngredients(recipe)
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
    }    

///////// PAGE SETUP /////////

    $scope.recipe = RecipeFactory.recipe;

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        updateList(GlobalListService.updateLists(user))
      })
    } else {
      updateList(GlobalListService.updateLists(UserService.user))
    }

///////// UPDATE COOKBOOK /////////

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

///////// UPDATE SHOPPING LIST /////////

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
        })
    }
  }

  CookbookController.$inject = ['$scope', 'CookbookService', 'RecipeFactory', 'UserService', 'GlobalListService', 'ShoppingListService', 'Auth']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
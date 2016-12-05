function RecipeController($scope, RecipeFactory, UserService, CookbookService, GlobalListService, ShoppingListService){
  var ctrl = this;
  $scope.recipe = RecipeFactory.recipe

  var setAndUpdateRecipeIngredients = function(){
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


///////// UPDATE COOKBOOK /////////    

    $scope.addRecipe = function(recipe){
      debugger;
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          $scope.user = GlobalListService.updateLists(user)
          $scope.$emit("updateList", {user: user})
          recipe.bookmarked = true
        });
    }

    $scope.removeRecipe = function(recipe){
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          $scope.user = GlobalListService.updateLists(user)
          recipe.bookmarked = false
        });
    }

///////// UPDATE SHOPPING LIST /////////

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', UserService.user.shoppingList.id, ingredient.food)
        .success(function(user){
          GlobalListService.updateLists(user)
          setAndUpdateRecipeIngredients()
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.food)
        .success(function(user){
          GlobalListService.updateLists(user)
          setAndUpdateRecipeIngredients()
        })
    }


}

RecipeController.$inject = ['$scope', 'RecipeFactory', 'UserService', 'CookbookService', 'GlobalListService', 'ShoppingListService']

angular
  .module('foodEase')
  .controller('RecipeController', RecipeController);
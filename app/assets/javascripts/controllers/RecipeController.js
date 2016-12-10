function RecipeController($scope, RecipeService, UserService, CookbookService, GlobalListService, ShoppingListService, $rootScope){
  var ctrl = this;
  $scope.recipe = RecipeService.recipe

  $rootScope.$on('showRecipe', function(event, recipe){
    setAndUpdateRecipeIngredients(CookbookService.alreadyInCookbook(recipe))
  })
  
  var setAndUpdateRecipeIngredients = function(recipe){
      if (recipe){
        $scope.recipe = RecipeService.recipe = updateIngredients(recipe)
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
          setAndUpdateRecipeIngredients(RecipeService.recipe)
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.food)
        .success(function(user){
          GlobalListService.updateLists(user)
          setAndUpdateRecipeIngredients(RecipeService.recipe)
        })
    }
}

RecipeController.$inject = ['$scope', 'RecipeService', 'UserService', 'CookbookService', 'GlobalListService', 'ShoppingListService', '$rootScope']

angular
  .module('foodEase')
  .controller('RecipeController', RecipeController);
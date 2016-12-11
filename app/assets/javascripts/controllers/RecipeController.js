function RecipeController($scope, RecipeService, UserService, CookbookService, GlobalListService, ShoppingListService, $rootScope){
  var ctrl = this;
  $scope.recipe = RecipeService.recipe
  $scope.user = UserService.user
  
  if(RecipeService.recipe && UserService.user){
    setAndUpdateRecipeIngredients(CookbookService.alreadyInCookbook(RecipeService.recipe))
  }

  $rootScope.$on('showRecipe', function(event, recipe){    
    if(RecipeService.recipe && UserService.user){
      setAndUpdateRecipeIngredients(CookbookService.alreadyInCookbook(recipe))
    } else {
      $scope.recipe = RecipeService.recipe = recipe
    }
  })

  $rootScope.$on('removeRecipe', function(event, recipe){
    $scope.removeRecipe(recipe);
  })

  function setAndUpdateRecipeIngredients(recipe){
      if (recipe){
        $scope.recipe = RecipeService.recipe = updateIngredients(recipe)
      }
    }

  function updateIngredients(recipe){
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
      CookbookService.addToCookbook(recipe)
        .success(function(user){
          $scope.user = GlobalListService.updateLists(user)
          $rootScope.$emit("updateCookbook", user)
          recipe.bookmarked = true
        });
    }

    $scope.removeRecipe = function(recipe){
      CookbookService.removeFromCookbook(recipe)
        .success(function(user){
          $scope.user = GlobalListService.updateLists(user)
          $rootScope.$emit("updateCookbook", user)
          recipe.bookmarked = false
        });
    }

///////// UPDATE SHOPPING LIST /////////

    $scope.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', ingredient.food)
        .success(function(user){
          GlobalListService.updateLists(user)
          setAndUpdateRecipeIngredients(RecipeService.recipe)
        })
    }

    $scope.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', ingredient.food)
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
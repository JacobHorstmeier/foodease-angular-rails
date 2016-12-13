function RecipeController($scope, RecipeService, UserService, CookbookService, GlobalListService, ShoppingListService, $rootScope){
  
  var ctrl = this;
  $scope.user = UserService.user  
  showRecipe(RecipeService.recipe)

  $rootScope.$on('showRecipe', function(event, recipe){    
    showRecipe(recipe)
  })

  $rootScope.$on('removeRecipe', function(event, recipe){
    $scope.removeRecipe(recipe);
  })

  function showRecipe(recipe){
    if($scope.user = UserService.user && recipe){
      var recipe = CookbookService.alreadyInCookbook(recipe)
      setAndUpdateRecipeIngredients(recipe)
    } else if(recipe){
      $scope.recipe = RecipeService.recipe = recipe
    }
  }

  function setAndUpdateRecipeIngredients(recipe){
      if (recipe){
        for(var i = recipe.ingredients.length - 1; i >= 0; i--){
          if(recipe.ingredients[i].text.length > 100){            
            recipe.ingredients.splice(i, 1)
          }          
        }
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
        })
    }

    $scope.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', ingredient.food)
        .success(function(user){
          GlobalListService.updateLists(user)
        })
    }
}

RecipeController.$inject = ['$scope', 'RecipeService', 'UserService', 'CookbookService', 'GlobalListService', 'ShoppingListService', '$rootScope']

angular
  .module('foodEase')
  .controller('RecipeController', RecipeController);
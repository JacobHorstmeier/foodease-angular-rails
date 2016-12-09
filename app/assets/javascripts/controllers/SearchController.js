(function(){
  function SearchController(Auth, $scope, Pagination, RecipeService, CookbookService, SearchService, UserService, GlobalListService, ShoppingListService){ 
    
///////// DECLARATIONS /////////
    
    var ctrl = this;

    // var setAndUpdateRecipeIngredients = function(){
    //   if (RecipeService.recipe){
    //     $scope.recipe = updateIngredients(RecipeService.recipe)
    //   }
    // }

    // var updateIngredients = function(recipe){
    //   recipe.ingredients.forEach(function(ingredient){
    //     ingredient.added = false;
    //     UserService.user.shoppingList.ingredients.forEach(function(item){
    //       if(item.food === ingredient.food){
    //         ingredient.added = true;
    //       }
    //     })
    //   })
    //   return recipe
    // }

    ctrl.recipeSearch = function(query){
      $scope.searched = SearchService.searched = true;
      RecipeService.getRecipes(query, UserService.user)
        .success(function(response){
          $scope.searchQuery = SearchService.query = response.q;
          $scope.searchResults = [];
          if(response.hits.length > 0){
            response.hits.forEach(function(recipe){
              $scope.searchResults.push(recipe.recipe);
            });
            SearchService.searchResults = $scope.searchResults;
            $scope.pagination = SearchService.pagination = SearchService.paginate($scope.searchResults.length)
          }
        })
        .error(function(response){
          alert("There was an unexpected error processing your request. Please try another search term for now.")
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $scope.recipe = RecipeService.recipe = CookbookService.alreadyInCookbook(recipe);
      setAndUpdateRecipeIngredients()
    }

///////// PAGE SETUP /////////

    $("input:text:visible:first").focus();

    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    // setAndUpdateRecipeIngredients()
    
    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.updateLists(user)
      })
    } else {
      $scope.user = GlobalListService.updateLists(UserService.user)
    }

///////// UPDATE COOKBOOK /////////    

    // // $scope.addRecipe = CookbookService.addRecipe
    // $scope.addRecipe = function(recipe){
    //   CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
    //     .success(function(user){
    //       recipe.bookmarked = true
    //       $scope.user = GlobalListService.updateLists(user)
    //     });
    // }

    // // $scope.removeRecipe = CookbookService.removeRecipe
    // $scope.removeRecipe = function(recipe){
    //   CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
    //     .success(function(user){
    //       recipe.bookmarked = false
    //       $scope.user = GlobalListService.updateLists(user)
    //     });
    // }

///////// UPDATE SHOPPING LIST /////////

    // ctrl.addToShoppingList = function(ingredient){
    //   ingredient.added = true;
    //   ShoppingListService.updateShoppingList('PUT', UserService.user.shoppingList.id, ingredient.food)
    //     .success(function(user){
    //       GlobalListService.updateLists(user)
    //       setAndUpdateRecipeIngredients()
    //     })
    // }

    // ctrl.removeFromShoppingList = function(ingredient){
    //   ingredient.added = false;
    //   ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.food)
    //     .success(function(user){
    //       GlobalListService.updateLists(user)
    //       setAndUpdateRecipeIngredients()
    //     })
    // }
  }

  SearchController.$inject = ['Auth', '$scope', 'Pagination', 'RecipeService', 'CookbookService', 'SearchService', 'UserService', 'GlobalListService', 'ShoppingListService']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
(function(){
  function SearchController(Auth, $scope, Pagination, RecipeFactory, CookbookService, SearchService, UserService, GlobalListService, ShoppingListService){ 
    
///////// DECLARATIONS /////////
    
    var ctrl = this;

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

    ctrl.recipeSearch = function(query){
      $scope.searched = SearchService.searched = true;
      RecipeFactory.getRecipes(query, UserService.user)
        .success(function(response){
          $scope.searchQuery = SearchService.query = response.q;
          $scope.searchResults = [];
          if(response.hits.length > 0){
            response.hits.forEach(function(recipe){
              $scope.searchResults.push(recipe.recipe);
            });
            SearchService.searchResults = $scope.searchResults;
            $scope.pagination = Pagination.getNew(10);
            $scope.pagination.numPages = Math.ceil($scope.searchResults.length/$scope.pagination.perPage);
            SearchService.pagination = $scope.pagination;
          }
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $scope.recipe = RecipeFactory.recipe = CookbookService.alreadyInCookbook(recipe);
      setAndUpdateRecipeIngredients()
    }

///////// PAGE SETUP /////////

    $("input:text:visible:first").focus();

    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    setAndUpdateRecipeIngredients()
    
    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.updateLists(user)
      })
    } else {
      $scope.user = GlobalListService.updateLists(UserService.user)
    }

///////// UPDATE COOKBOOK /////////    

    $scope.addRecipe = function(recipe){
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          recipe.bookmarked = true
          $scope.user = GlobalListService.updateLists(user)
        });
    }

    $scope.removeRecipe = function(recipe){
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          recipe.bookmarked = false
          $scope.user = GlobalListService.updateLists(user)
        });
    }

///////// UPDATE SHOPPING LIST /////////

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      // debugger;
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

  SearchController.$inject = ['Auth', '$scope', 'Pagination', 'RecipeFactory', 'CookbookService', 'SearchService', 'UserService', 'GlobalListService', 'ShoppingListService']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
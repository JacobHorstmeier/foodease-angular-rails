(function(){
  function SearchController(Auth, $scope, UserService, Pagination, RecipeFactory, CookbookService, SearchService, UserService, ShoppingListService){ 
    $("input:text:visible:first").focus();
    var ctrl = this;

    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    $scope.recipe = RecipeFactory.recipe;

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
      })
    }

    ctrl.recipeSearch = function(query){
      // SearchService.searched;
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
    }

    function updateLists(user){
      CookbookService.recipes = user.cookbook.recipes
      CookbookService.ingredients = user.cookbook.ingredients;      
      ShoppingListService.items = user.shoppingList.ingredients;
    }

    $scope.addRecipe = function(recipe){
      recipe.bookmarked = true
      CookbookService.addToCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateLists(user)
          // CookbookService.recipes = user.cookbook.recipes
          // CookbookService.ingredients = user.cookbook.ingredients;
        });
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false
      CookbookService.removeFromCookbook(UserService.user.cookbook.id, recipe)
        .success(function(user){
          updateLists(user)
          // CookbookService.recipes = user.cookbook.recipes
          // CookbookService.ingredients = user.cookbook.ingredients;
        });
    }
  }

  SearchController.$inject = ['Auth', '$scope', 'UserService', 'Pagination', 'RecipeFactory', 'CookbookService', 'SearchService', 'UserService', 'ShoppingListService']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
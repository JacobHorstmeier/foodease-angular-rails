(function(){
  function SearchController(Auth, $scope, Pagination, RecipeFactory, CookbookService, SearchService, UserService, ShoppingListService, GlobalListService){ 
    $("input:text:visible:first").focus();
    var ctrl = this;

    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    $scope.recipe = RecipeFactory.recipe;
    


    // var updateLists = function(user){
    //   debugger;
    //   CookbookService.recipes = user.cookbook.recipes
    //   CookbookService.ingredients = user.cookbook.ingredients;      
    //   ShoppingListService.items = user.shoppingList.ingredients;
    //   $scope.user = UserService.user = user
    //   debugger;
    // }

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.updateLists(user)
      })
    } else {
      $scope.user = GlobalListService.updateLists(UserService.user)
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
    }

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
  }

  SearchController.$inject = ['Auth', '$scope', 'Pagination', 'RecipeFactory', 'CookbookService', 'SearchService', 'UserService', 'ShoppingListService', 'GlobalListService']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
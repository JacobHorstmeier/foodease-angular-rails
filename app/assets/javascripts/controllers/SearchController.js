(function(){
  function SearchController(Auth, $scope, $rootScope, Pagination, RecipeFactory, CookbookService, $state, SearchService){ 
    $("input:text:visible:first").focus();
    var ctrl = this;

    $rootScope.state = $state.current.name;
    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    $scope.recipe = RecipeFactory.recipe;

    ctrl.recipeSearch = function(query){
      SearchService.searched;
      $scope.searched = SearchService.searched = true;
      RecipeFactory.getRecipes(query, $rootScope.user)
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
      recipe.bookmarked = true
      CookbookService.addToCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          // debugger;
          CookbookService.recipes = user.cookbook.recipes
        });
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false
      CookbookService.removeFromCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(user){
          // debugger;
          CookbookService.recipes = user.cookbook.recipes
        });
    }

  }

  SearchController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'RecipeFactory', 'CookbookService', '$state', 'SearchService']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
(function(){
  function SearchController(Auth, $scope, $rootScope, Pagination, SearchService, RecipeService, $state){ 
    $("input:text:visible:first").focus();
    $rootScope.state = $state.current.name
    var ctrl = this;

    ctrl.recipeSearch = function(query){
      $rootScope.searchRecipes = [];
      SearchService.getRecipes(query, $rootScope.user)
        .success(function(response){
          $rootScope.searchQuery = response.q;
          response.hits.forEach(function(res){
            $rootScope.searchRecipes.push(res.recipe)
          });
          if(response.hits.length == 0){
            $scope.noResults = true;
          } else {
            $scope.noResults = false;
          };
          $rootScope.searchPagination = Pagination.getNew(10);
          $rootScope.searchPagination.numPages = Math.ceil($rootScope.searchRecipes.length/$rootScope.searchPagination.perPage);
        })
        .error(function(error){
          alert("There was an unexpected error processing your request. Please try another search query.");
        });
    };

    ctrl.showSearchRecipe = function(recipe){
      $rootScope.recipe = RecipeService.alreadyInCookbook(recipe);
    }

    $scope.addRecipe = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook($rootScope.user.cookbook.id, recipe);
    }

    $scope.removeRecipe = function(recipe){
      recipe.bookmarked = false
      RecipeService.removeFromCookbook($rootScope.user.cookbook.id, recipe);
    }

  }

  SearchController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'SearchService', 'RecipeService', '$state']

  angular
  .module('reciPlease')
  .controller('SearchController', SearchController)
}());
(function(){
  function SearchController(Auth, $scope, $rootScope, Pagination, RecipeService, CookbookService, SearchService, UserService, GlobalListService, ShoppingListService, Flash){ 
    
///////// DECLARATIONS /////////
    
    var ctrl = this;

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
          Flash.create('warning', "Oops! Something went wrong with the API call. Try another search term for now", 5000, {container: 'search'})
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $rootScope.$emit('showRecipe', recipe)
    }

///////// PAGE SETUP /////////

    $("input:text:visible:first").focus();

    $scope.searched = SearchService.searched;
    $scope.searchQuery = SearchService.query;
    $scope.pagination = SearchService.pagination;
    $scope.searchResults = SearchService.searchResults;
    
    if(UserService.user){
      $scope.user = GlobalListService.updateLists(UserService.user)
    } else {
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.updateLists(user)
      })
    }
  }

  SearchController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'RecipeService', 'CookbookService', 'SearchService', 'UserService', 'GlobalListService', 'ShoppingListService', 'Flash']

  angular
  .module('foodEase')
  .controller('SearchController', SearchController)
}());
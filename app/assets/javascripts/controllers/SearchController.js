(function(){
  function SearchController(Auth, $scope, $rootScope, Pagination, SearchService, RecipeService, $state){ 
    $("input:text:visible:first").focus();
    $rootScope.state = $state.current.name
    var ctrl = this;

    ctrl.recipeSearch = function(query){
      $rootScope.searchRecipes = [];
      SearchService.getRecipes(query, $rootScope.user)
        .success(function(response){
          $rootScope.searchQuery = response.q
          response.hits.forEach(function(res){
            $rootScope.searchRecipes.push(res.recipe)
          })
          if(response.hits.length == 0){
            $scope.noResults = true;
          }
          $rootScope.searchPagination = Pagination.getNew(10);
          $rootScope.searchPagination.numPages = Math.ceil($rootScope.searchRecipes.length/$rootScope.searchPagination.perPage);
        })
        .error(function(error){
          alert("There was an unexpected error processing your request. Please try again in a moment.")
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $rootScope.recipe = ctrl.alreadyInCookbook(recipe);
    }

    ctrl.addToCookbook = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(cookbook){  
          $rootScope.cookbookRecipes = cookbook.recipes
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      recipe.bookmarked = false
      var recipe = recipe
      RecipeService.removeFromCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(cookbook){
          $rootScope.cookbookRecipes = cookbook.recipes
        })
    }

    ctrl.alreadyInCookbook = function(recipe){
      if($rootScope.user){
        var recipes = $rootScope.cookbookRecipes
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            recipe.bookmarked = true
          }
        }
      }
      return recipe
    }
  }

  SearchController.$inject = ['Auth', '$scope', '$rootScope', 'Pagination', 'SearchService', 'RecipeService', '$state']

  angular
  .module('reciPlease')
  .controller('SearchController', SearchController)
}());
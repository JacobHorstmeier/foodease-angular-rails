(function(){
  angular
  .module('reciPlease')
  .controller('SearchController', ['Auth', '$scope', '$rootScope', 'Pagination', 'SearchService', 'RecipeService', function(Auth, $scope, $rootScope, Pagination, SearchService, RecipeService){ 
    $("input:text:visible:first").focus();
    var ctrl = this;

    ctrl.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      $rootScope.user = user
      $rootScope.cookbookRecipes = $rootScope.user.cookbook.recipes
    })

    ctrl.recipeSearch = function(query){
      $rootScope.searchRecipes = [];
      // debugger;
      SearchService.getRecipes(query, $rootScope.user)
        .success(function(response){
          $rootScope.searchQuery = response.q
          response.hits.forEach(function(res){
            $rootScope.searchRecipes.push(res.recipe)
          })
          ctrl.pagination = Pagination.getNew(10);
          ctrl.pagination.numPages = Math.ceil($rootScope.searchRecipes.length/ctrl.pagination.perPage);
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $rootScope.recipe = ctrl.alreadyInCookbook(recipe);
    }

    ctrl.addToCookbook = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(cookbook){  
          $rootScope.user.cookbook = cookbook
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      recipe.bookmarked = false
      var recipe = recipe
      RecipeService.removeFromCookbook($rootScope.user.cookbook.id, recipe)
        .success(function(cookbook){
          $rootScope.user.cookbook = cookbook;
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
  }])
}());
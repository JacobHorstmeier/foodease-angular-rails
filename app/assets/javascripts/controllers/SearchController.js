(function(){
  angular
  .module('reciPlease')
  .controller('SearchController', function(Auth, $scope, $rootScope, Pagination, SearchService, RecipeService){ 
    var ctrl = this;

    ctrl.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      ctrl.user = user
      $rootScope.cookbookRecipes = ctrl.user.cookbook.recipes
    })

    ctrl.recipeSearch = function(query){
      $rootScope.searchRecipes = [];
      SearchService.getRecipes(query)
        .success(function(response){
          response.hits.forEach(function(res){
            $rootScope.searchRecipes.push(res.recipe)
          })
          ctrl.pagination = Pagination.getNew(10);
          ctrl.pagination.numPages = Math.ceil($rootScope.searchRecipes.length/ctrl.pagination.perPage);
        })
    };

    ctrl.showSearchRecipe = function(recipe){
      $rootScope.recipe = ctrl.alreadyInCookbook(recipe);
      ;
    }

    ctrl.addToCookbook = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){  
          ctrl.user.cookbook = cookbook
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      recipe.bookmarked = false
      var recipe = recipe
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
        })
    }

    ctrl.alreadyInCookbook = function(recipe){
      if(ctrl.user){
        var recipes = $rootScope.cookbookRecipes
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            recipe.bookmarked = true
          }
        }
      }
      return recipe
    }
  })
}())
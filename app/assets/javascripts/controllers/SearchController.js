angular
  .module('reciPlease')
  .controller('SearchController', function($scope, Pagination, Auth, SearchService, RecipeService){ 

    $scope.signedIn = Auth.isAuthenticated;   
    var ctrl = this;
    ctrl.user = Auth._currentUser

    ctrl.recipeSearch = function(query){
      ctrl.recipes = [];
      SearchService.getRecipes(query)
        .success(function(response){
          response.hits.forEach(function(res){
            res.recipe.uri = res.recipe.uri.split('_')[1]
            ctrl.recipes.push(res.recipe)
          })
          ctrl.pagination = Pagination.getNew(10);
          ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);
        })
    };

    ctrl.recipe = null
    ctrl.showSearchRecipe = function(recipe){
      ctrl.recipe = recipe
    }

    ctrl.addToCookbook = function(recipe){
      RecipeService.addToCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){  
          ctrl.user.cookbook = cookbook
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe.id)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
        })
    }

    ctrl.alreadyInCookbook = function(recipe){
      // check users cookbook for recipe
    }
  })
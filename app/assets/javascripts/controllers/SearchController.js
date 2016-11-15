angular
  .module('reciPlease')
  .controller('SearchController', function(Auth, $scope, Pagination, SearchService, RecipeService){ 
    var ctrl = this;

    $scope.signedIn = Auth.isAuthenticated;   
    Auth.currentUser().then(function(user) {
      ctrl.user = user
    $scope.cookbookRecipes = ctrl.user.cookbook.recipes
    // debugger;
    })
    // ctrl.user = Auth._currentUser

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
          debugger;
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
          debugger;
        })
    }

    ctrl.alreadyInCookbook = function(recipe){
      // debugger;
      var recipes = $scope.cookbookRecipes
      var verdict = false;
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].label === recipe.label){
          verdict = true;
        }
      }
      return verdict;
    }
  })
(function(){
  angular
  .module('reciPlease')
  .controller('SearchController', function(Auth, $scope, $rootScope, Pagination, SearchService, RecipeService){ 
    var ctrl = this;

    ctrl.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      ctrl.user = user
      ctrl.cookbookRecipes = ctrl.user.cookbook.recipes
    })

    ctrl.recipeSearch = function(query){
      debugger;
      $rootScope.recipes = [];
      SearchService.getRecipes(query)
        .success(function(response){
          response.hits.forEach(function(res){
            $rootScope.recipes.push(res.recipe)
          })
          debugger;
          ctrl.pagination = Pagination.getNew(10);
          ctrl.pagination.numPages = Math.ceil($rootScope.recipes.length/ctrl.pagination.perPage);
        })
    };

    ctrl.recipe = null
    ctrl.showSearchRecipe = function(recipe){
      ctrl.recipe = recipe;
      ctrl.alreadyInCookbook(recipe);
    }

    ctrl.addToCookbook = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){  
          ctrl.user.cookbook = cookbook
          // debugger;
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

    // ctrl.recipeAdded = false
    // ctrl.toggleShow = function(){
    //   if($scope.recipeAdded == false){
    //     $scope.recipeAdded = true
    //   }else if($scope.recipeAdded == true){
    //     $scope.recipeAdded = false;
    //   }
    // }

    ctrl.alreadyInCookbook = function(recipe){
      if(ctrl.user){
        var recipes = ctrl.cookbookRecipes
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            recipe.bookmarked = true
          }
        }
      }
    }
  })
}())
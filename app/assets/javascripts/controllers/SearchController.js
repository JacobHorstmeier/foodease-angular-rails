(function(){
  angular
  .module('reciPlease')
  .controller('SearchController', function(Auth, $scope, Pagination, SearchService, RecipeService){ 
    var ctrl = this;

    $scope.signedIn = Auth.isAuthenticated;   
    Auth.currentUser().then(function(user) {
      ctrl.user = user
      // debugger;
    $scope.cookbookRecipes = ctrl.user.cookbook.recipes
    })

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
      $scope.recipeAdded = true
      RecipeService.addToCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){  
          ctrl.user.cookbook = cookbook
          // debugger;
        })
    }

    ctrl.removeFromCookbook = function(recipe){
      $scope.recipeAdded = false
      var recipe = recipe
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
          // debugger;
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
console.log("in the controller");
console.log(ctrl.user);
    ctrl.alreadyInCookbook = function(recipe){
      console.log("in the function");
      console.log(ctrl.user);
      if(ctrl.user){
        var recipes = $scope.cookbookRecipes
        $scope.recipeAdded = false
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            $scope.recipeAdded = true;
          }
        }
        // debugger;
        return $scope.recipeAdded;
      }
    }
  })
}())
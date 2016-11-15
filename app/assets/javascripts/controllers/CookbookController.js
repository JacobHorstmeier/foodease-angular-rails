(function(){
  angular
  .module('reciPlease')
  .controller('CookbookController', function(Auth, $scope, Pagination, RecipeService){
    
    var ctrl = this

    Auth.currentUser().then(function(user) {
      ctrl.user = user
      ctrl.recipes = ctrl.user.cookbook.recipes
      $scope.cookbookRecipes = ctrl.user.cookbook.recipes
      ctrl.pagination = Pagination.getNew(10);
      ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);
    })


    ctrl.recipe = null
    ctrl.showCookbookRecipe = function(recipe){
      ctrl.recipe = recipe
    }

    ctrl.removeFromCookbook = function(recipe){
      $scope.recipeAdded = false
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
          ctrl.recipes = user.cookbook.recipes
          ctrl.recipe = null
        })
    }

    // ctrl.toggleShow = function(){
    //   if($scope.recipeAdded == false){
    //     $scope.recipeAdded = true
    //   }else if($scope.recipeAdded == true){
    //     $scope.recipeAdded = false;
    //   }
    // }

    ctrl.alreadyInCookbook = function(recipe){
      var recipes = $scope.cookbookRecipes
      $scope.recipeAdded = false
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].label === recipe.label){
          $scope.recipeAdded = true;
        }
      }
      return $scope.recipeAdded;
    }
  })
}())
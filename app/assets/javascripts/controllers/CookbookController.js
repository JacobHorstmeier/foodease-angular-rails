(function(){
  angular
  .module('reciPlease')
  .controller('CookbookController', function(Auth, $scope, Pagination, RecipeService){
    
    var ctrl = this

    Auth.currentUser().then(function(user) {
      // debugger;
      ctrl.user = user
      ctrl.recipes = ctrl.user.cookbook.recipes
      ctrl.cookbookRecipes = ctrl.user.cookbook.recipes
      ctrl.pagination = Pagination.getNew(10);
      ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);
    })


    ctrl.recipe = null
    ctrl.showCookbookRecipe = function(recipe){
      ctrl.recipe = recipe
      ctrl.alreadyInCookbook(recipe);
    }

    ctrl.removeFromCookbook = function(recipe){
      recipe.bookmarked = false
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
          ctrl.recipes = user.cookbook.recipes
          ctrl.recipe = null
        })
    }

    // ctrl.toggleShow = function(){
      // if($scope.recipeAdded == false){
      //   $scope.recipeAdded = true
      // }else if($scope.recipeAdded == true){
      //   $scope.recipeAdded = false;
    //   }
    // }

    ctrl.alreadyInCookbook = function(recipe){
      var recipes = ctrl.cookbookRecipes
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].label === recipe.label){
          recipe.bookmarked = true;
        }
      }
      // return $scope.recipeAdded;
    }
  })
}())
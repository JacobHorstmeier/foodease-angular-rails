angular
  .module('reciPlease')
  .controller('CookbookController', function(Auth, $scope, Pagination, user, RecipeService){
    var ctrl  = this
    ctrl.user = user
    ctrl.recipes = ctrl.user.cookbook.recipes
    ctrl.pagination = Pagination.getNew(10);
    ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);

    ctrl.recipe = null
    ctrl.showCookbookRecipe = function(recipe){
      ctrl.recipe = recipe
    }

    ctrl.removeFromCookbook = function(recipe){
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          ctrl.user.cookbook = cookbook;
          ctrl.recipes = user.cookbook.recipes
          ctrl.recipe = null
        })
    }
  })


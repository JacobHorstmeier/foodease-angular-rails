(function(){
  function CookbookController($scope, CookbookService, RecipeService, UserService, GlobalListService, ShoppingListService, Auth, $rootScope) {

///////// DECLARATIONS /////////

    var ctrl = this

    $rootScope.$on('updateCookbook', function(event, user){
      updateList(user);
    })

    var updateList = function(user){
      $scope.user = user
      $scope.cookbookRecipes = user.cookbook.recipes;
    }


    ctrl.showCookbookRecipe = function(recipe){
      $rootScope.$emit('showRecipe', recipe)
    }

    $scope.removeRecipe = function(recipe){
      $rootScope.$emit('removeRecipe', recipe)
    }

///////// PAGE SETUP /////////

    $scope.recipe = RecipeService.recipe;

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        updateList(GlobalListService.updateLists(user))
      })
    } else {
      updateList(GlobalListService.updateLists(UserService.user))
    }
  }

  CookbookController.$inject = ['$scope', 'CookbookService', 'RecipeService', 'UserService', 'GlobalListService', 'ShoppingListService', 'Auth', '$rootScope']

  angular
  .module('foodEase')
  .controller('CookbookController', CookbookController)
  
}())
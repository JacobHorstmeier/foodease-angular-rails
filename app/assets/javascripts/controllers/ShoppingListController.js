(function(){
  function ShoppingListController($rootScope, $scope, Auth, Pagination, ShoppingListService, UserService, CookbookService){
    var ctrl = this

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
        updateLists(user)
      })
    } else {
      updateLists(UserService.user)
    }

    function updateLists(user){
      $scope.user = UserService.user = user
      $scope.ingredients = CookbookService.ingredients =  UserService.user.cookbook.ingredients
      $scope.shoppingList = ShoppingListService.items = UserService.user.shoppingList.ingredients
      updateIngredients()
    }
    
    
    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateLists(user)
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateLists(user)
        })
    }

    function updateIngredients(){
      $scope.ingredients.forEach(function(ingredient){
        ingredient.added = false;
        $scope.shoppingList.forEach(function(item){
          if(item.food === ingredient.food){
            ingredient.added = true;
          }
        })
      })
    }

    ctrl.toggleDone = function(ingredient){
      if(ingredient.done == true){
        ingredient.done = false;
      } else {
        ingredient.done = true;
      }
    }

    
  }

  ShoppingListController.$inject = ['$rootScope', '$scope', 'Auth', 'Pagination', 'ShoppingListService', 'UserService', 'CookbookService']

angular
  .module('foodEase')
  .controller('ShoppingListController', ShoppingListController);
}());
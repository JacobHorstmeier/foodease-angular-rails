(function(){
  function ShoppingListController($rootScope, $scope, Auth, Pagination, ShoppingListService, UserService){
    var ctrl = this

    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
      })
    }

    $scope.updateLists = function(){
      if(UserService.user == undefined){
        Auth.currentUser().then(function(user){
          UserService.user = user
          $rootScope.ingredients = UserService.user.cookbook.ingredients
          $rootScope.shoppingList = UserService.user.shopping_list.ingredients
          ctrl.updateIngredients()
          // debugger;
        })
      } else {
        $rootScope.ingredients = UserService.user.cookbook.ingredients
        $rootScope.shoppingList = UserService.user.shopping_list.ingredients
        ctrl.updateIngredients()
        // debugger;
      }

    }

    
    
    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', UserService.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
      ctrl.updateIngredients()
        })
    }

    ctrl.updateIngredients = function(){
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

    $scope.updateLists()
    
  }

  ShoppingListController.$inject = ['$rootScope', '$scope', 'Auth', 'Pagination', 'ShoppingListService', 'UserService']

angular
  .module('foodEase')
  .controller('ShoppingListController', ShoppingListController);
}());
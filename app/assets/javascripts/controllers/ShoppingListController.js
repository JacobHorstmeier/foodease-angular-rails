(function(){
  function ShoppingListController($rootScope, $scope, Auth, Pagination, ShoppingListService, UserService, GlobalListService){
    var ctrl = this

    var updateList = function(user){
      $scope.user = user
      $scope.ingredients = user.cookbook.ingredients
      $scope.shoppingList = user.shoppingList.ingredients
      updateIngredients()
    }
    
    if(UserService.user === undefined){
      Auth.currentUser().then(function(user){
        updateList(GlobalListService.updateLists(user))
      })
    } else {
      updateList(GlobalListService.updateLists(UserService.user))
    }

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', UserService.user.shoppingList.id, ingredient.id)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
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
        ShoppingListService.checkItem(UserService.user.shoppingList.id, ingredient.id, false, 'PUT')
          .success(function(something){
            debugger;
          })
      } else {
        ingredient.done = true;
        ShoppingListService.checkItem(UserService.user.shoppingList.id, ingredient.id, true, 'PUT')
          .success(function(something){
            debugger;
          })        
      }
    }

    
  }

  ShoppingListController.$inject = ['$rootScope', '$scope', 'Auth', 'Pagination', 'ShoppingListService', 'UserService', 'GlobalListService']

angular
  .module('foodEase')
  .controller('ShoppingListController', ShoppingListController);
}());
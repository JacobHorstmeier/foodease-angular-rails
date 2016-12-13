(function(){
  function ShoppingListController($rootScope, $scope, Auth, Pagination, ShoppingListService, UserService, GlobalListService){
    var ctrl = this

    var updateList = function(user){
      $scope.user = user
      $scope.shoppingList = user.shoppingList.ingredients
      updateIngredients()
    }
    
    if(UserService.user){
      updateList(GlobalListService.updateLists(UserService.user))
    } else {
      Auth.currentUser().then(function(user){
        updateList(GlobalListService.updateLists(user))
      })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', ingredient.id)
        .success(function(user){
          updateList(GlobalListService.updateLists(user))
        })
    }

    function updateIngredients(){
      $scope.shoppingList.forEach(function(ingredient){
        $scope.user.shoppingListIngredients.forEach(function(item){
          if(ingredient.id == item.ingredient_id){
            ingredient.checked = item.checked
          }
        })
      })
    }

    ctrl.toggleChecked = function(ingredient){
      if(ingredient.checked == true){
        ingredient.checked = false;
        ShoppingListService.checkItem(ingredient.id, false)
          .success(function(user){
            UserService.user = user
          })
      } else {
        ingredient.checked = true;
        ShoppingListService.checkItem(ingredient.id, true)
          .success(function(user){
            UserService.user = user
          })        
      }
    }
  }

  ShoppingListController.$inject = ['$rootScope', '$scope', 'Auth', 'Pagination', 'ShoppingListService', 'UserService', 'GlobalListService']

angular
  .module('foodEase')
  .controller('ShoppingListController', ShoppingListController);
}());
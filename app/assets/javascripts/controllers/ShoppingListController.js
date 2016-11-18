(function(){
  function ShoppingListController($rootScope, $scope, Auth, Pagination, ShoppingListService, $state){
    var ctrl = this
    $rootScope.state = $state.current.name

    $scope.updateLists = function(){
      if($rootScope.user == undefined){
        Auth.currentUser().then(function(user){
          $rootScope.user = user
          $rootScope.ingredients = $rootScope.user.cookbook.ingredients
          $rootScope.shoppingList = $rootScope.user.shopping_list.ingredients
          ctrl.updateIngredients()
          // debugger;
        })
      } else {
        $rootScope.ingredients = $rootScope.user.cookbook.ingredients
        $rootScope.shoppingList = $rootScope.user.shopping_list.ingredients
        ctrl.updateIngredients()
        // debugger;
      }

    }

    
    
    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', $rootScope.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', $rootScope.user.shopping_list.id, ingredient.id)
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

  ShoppingListController.$inject = ['$rootScope', '$scope', 'Auth', 'Pagination', 'ShoppingListService', '$state']

angular
  .module('reciPlease')
  .controller('ShoppingListController', ShoppingListController);
}());
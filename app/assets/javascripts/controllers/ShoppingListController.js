angular
  .module('reciPlease')
  .controller('ShoppingListController', function($scope, Auth, Pagination, ShoppingListService){
    var ctrl = this
    Auth.currentUser().then(function(user) {
      ctrl.user = user
      $scope.ingredients = ctrl.user.cookbook.ingredients
      $scope.shoppingList = ctrl.user.shopping_list.ingredients
      ctrl.pagination = Pagination.getNew(10);
      ctrl.pagination.numPages = Math.ceil($scope.ingredients.length/ctrl.pagination.perPage);
      ctrl.updateIngredients()
    })

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', ctrl.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
        })
    }

    ctrl.removeFromShoppingList = function(ingredient){
      // debugger;
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', ctrl.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
          // debugger;
      ctrl.updateIngredients()
      // debugger;
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

    ctrl.alreadyInShoppingList = function(ingredient){
      var shoppingList = $rootScope.shoppingList
      for(var i = 0; i < shoppingList.length; i++){
        if(shoppingList[i] === ingredient){
          ingredient.added = true;
        }
      }
      ingredient.added = false;
    }
  })
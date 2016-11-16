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
    })

    ctrl.addToShoppingList = function(ingredient){
      ingredient.added = true;
      ShoppingListService.updateShoppingList('PUT', ctrl.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          // debugger;
          $scope.shoppingList = shoppingList.ingredients
        })

    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      ShoppingListService.updateShoppingList('DELETE', ctrl.user.shopping_list.id, ingredient.id)
        .success(function(shoppingList){
          $scope.shoppingList = shoppingList.ingredients
        })
    }
  })
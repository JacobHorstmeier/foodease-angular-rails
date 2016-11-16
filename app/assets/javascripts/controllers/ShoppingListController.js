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
      $scope.shoppingList.push(ingredient);

    }

    ctrl.removeFromShoppingList = function(ingredient){
      ingredient.added = false;
      var list = $scope.shoppingList
      for(var i = 0; i < list.length; i++){
        if(list[i] === ingredient){
          $scope.shoppingList.splice(i, 1)
        }
      }
    }
  })
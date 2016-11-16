angular
  .module('reciPlease')
  .controller('ShoppingListController', function($scope, Auth, Pagination){
    var ctrl = this
    Auth.currentUser().then(function(user) {
      ctrl.user = user
      // debugger;
      $scope.ingredients = ctrl.user.cookbook.ingredients
      $scope.shoppingList = ctrl.user.shopping_list
      ctrl.pagination = Pagination.getNew(10);
      ctrl.pagination.numPages = Math.ceil($scope.ingredients.length/ctrl.pagination.perPage);
    })
  })
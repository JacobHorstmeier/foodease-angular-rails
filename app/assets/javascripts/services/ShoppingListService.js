angular
  .module('reciPlease')
  .service('ShoppingListService', function($http){

    this.updateShoppingList = function(method, shoppingListId, ingredientId){
      var url = '/shopping_lists/' + shoppingListId + '/ingredients/' + ingredientId;
      return $http({url: url, method: method})
    }
  })
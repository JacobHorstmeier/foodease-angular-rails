angular
  .module('reciPlease')
  .service('ShoppingListService', function($http){

    this.updateShoppingList = function(method, shoppingListId, ingredientId){
      var url = '/shopping-lists/' + shoppingListId + '/ingredients/' + ingredientId;
      return $http({url: url, method: method})
    }
  })
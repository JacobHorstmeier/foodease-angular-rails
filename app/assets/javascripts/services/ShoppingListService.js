angular
  .module('reciPlease')
  .service('ShoppingListService', function($http){

    this.updateShoppingList = function(method, shoppingListId, ingredientId){
      var url = '/shopping-lists/' + shoppingListId + '/ingredients/' + ingredientId;
      // debugger;
      return $http({url: url, method: method})
    }

    // this.addToShoppingList = function(shoppingListId, ingredientId){      
    //   return updateShoppingList('PUT');
    // }

    // this.removeFromShoppingList = function(shoppingListId, ingredient){
    //   return updateShoppingList('DELETE');
    // }

  })
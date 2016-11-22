(function(){
  function ShoppingListService ($http){

    var items;

    this.updateShoppingList = function(method, shoppingListId, ingredientId){
      var url = '/shopping_lists/' + shoppingListId + '/ingredients/' + ingredientId;
      return $http({url: url, method: method})
    }

  }

  ShoppingListService.$inject = ['$http']

  angular
  .module('foodEase')
  .service('ShoppingListService', ShoppingListService)
}())


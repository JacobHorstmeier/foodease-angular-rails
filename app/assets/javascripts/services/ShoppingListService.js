(function(){
  function ShoppingListService ($http){

    var items;

    this.updateShoppingList = function(method, shoppingListId, ingredientId){
      var url = '/shopping_lists/' + shoppingListId + '/ingredients/' + ingredientId;
      return $http({url: url, method: method})
    }

    this.checkItem = function(shoppingListId, ingredientId, checked, method){
      var url = '/shopping_lists/' + shoppingListId + '/ingredients/' + ingredientId;
      return $http({url: url, method: method, data: {checked: checked}})
    }

  }

  ShoppingListService.$inject = ['$http']

  angular
  .module('foodEase')
  .service('ShoppingListService', ShoppingListService)
}())


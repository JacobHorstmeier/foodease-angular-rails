(function(){
  function ShoppingListService ($http){

    var items;

    this.updateShoppingList = function(method, shoppingListId, ingredient){
      // debugger;
      var url = '/shopping_list/' + shoppingListId
      if(Number.isInteger(ingredient)){
        url += '/ingredients/' + ingredient;
        return $http({url: url, method: method})        
      } else {
        // debugger;
        var data = {ingredient_name: ingredient, method: method}
        return $http({url: url, method: 'PUT', data: data})
      }

    }

    this.checkItem = function(shoppingListId, ingredient, checked, method){
      var url = '/shopping_list/' + shoppingListId + '/ingredients/' + ingredient;
      return $http({url: url, method: method, data: {checked: checked}})
    }

  }

  ShoppingListService.$inject = ['$http']

  angular
  .module('foodEase')
  .service('ShoppingListService', ShoppingListService)
}())


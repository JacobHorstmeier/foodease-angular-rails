(function(){
  function ShoppingListService ($http, UserService){

    this.items = [];

    this.updateShoppingList = function(method, ingredient){
      var shoppingListId  = UserService.user.shoppingList.id
      var url = '/shopping_list/' + shoppingListId
      if(Number.isInteger(ingredient)){
        url += '/ingredients/' + ingredient;
        return $http({url: url, method: method})        
      } else {
        var data = {ingredient_name: ingredient, method: method}
        return $http({url: url, method: 'PUT', data: data})
      }
    }

    this.checkItem = function(ingredient, checked){
      var shoppingListId  = UserService.user.shoppingList.id
      var url = '/shopping_list/' + shoppingListId + '/ingredients/' + ingredient;
      return $http({url: url, method: 'PUT', data: {checked: checked}})
    }
  }

  ShoppingListService.$inject = ['$http', 'UserService']

  angular
  .module('foodEase')
  .service('ShoppingListService', ShoppingListService)
}())


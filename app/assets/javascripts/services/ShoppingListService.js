angular
  .module('reciPlease')
  .service('ShoppingListService', function($http){

    this.addToShoppingList = function(shoppingListId, ingredient){
      var url = '/shopping-lists/' + shoppingListId + '/ingredients'
      return $http({
        url: url,
        method: 'PUT',
        data: {
          ingredient: ingredient
        }
      })
    }

    this.removeFromShoppingList = function(shoppingListId, ingredient){
      var url = '/shopping-lists/' + shoppingListId + '/ingredients'
      return $http({
        url: url,
        method: 'PUT',
        data: {
          remove: true,
          label: ingredient.label
        }
      })
    }

  })
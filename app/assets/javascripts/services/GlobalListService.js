(function(){
  function GlobalListService(CookbookService, ShoppingListService, UserService, HealthLabelService){
    this.updateLists = function(user){
      var user  = user
      UserService.user = user;
      CookbookService.recipes = user.cookbook.recipes;
      ShoppingListService.items = user.shoppingList.ingredients;
      return user;
    }
  }

  GlobalListService.$inject = ['CookbookService', 'ShoppingListService', 'UserService', 'HealthLabelService']

  angular
    .module('foodEase')
    .service('GlobalListService', GlobalListService)
}())
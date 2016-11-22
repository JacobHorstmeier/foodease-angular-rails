(function(){
  function GlobalListService(CookbookService, ShoppingListService, UserService){
    this.updateLists = function(user){
      UserService.user = user;
      CookbookService.recipes = user.cookbook.recipes;
      CookbookService.ingredients = user.cookbook.ingredients;
      ShoppingListService.items = user.shoppingList.ingredients;
      return user;
    }
  }

  GlobalListService.$inject = ['CookbookService', 'ShoppingListService', 'UserService']

  angular
    .module('foodEase')
    .service('GlobalListService', GlobalListService)
}())
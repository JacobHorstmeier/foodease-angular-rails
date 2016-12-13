(function(){
  function GlobalListService(CookbookService, ShoppingListService, UserService, HealthLabelService, SearchService){
    this.updateLists = function(user){
      UserService.user = user;
      CookbookService.recipes = user.cookbook.recipes;
      ShoppingListService.items = user.shoppingList.ingredients;
      return user;
    }

    this.clearLists = function(){
      UserService.user = undefined;
      SearchService.searched = false;
      SearchService.searchResults = [];
      SearchService.recipe = undefined;
      CookbookService.recipes = undefined;
      ShoppingListService.items = undefined;
      return undefined;
    }
  }

  GlobalListService.$inject = ['CookbookService', 'ShoppingListService', 'UserService', 'HealthLabelService', 'SearchService']

  angular
    .module('foodEase')
    .service('GlobalListService', GlobalListService)
}())
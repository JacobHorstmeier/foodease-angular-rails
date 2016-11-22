(function(){
  function CookbookService($http, $rootScope){

    this.addToCookbook = function(cookbookId, recipe){
      var recipe = recipe;
      var url = '/cookbooks/' + cookbookId + '/recipes'
      $http({
        url: url,
        method: 'PUT',
        data: {
          recipe: recipe
        }
      })
      .success(function(user){
        $rootScope.cookbookRecipes = user.cookbook.recipes
        $rootScope.user = user
        })
    }

    this.removeFromCookbook = function(cookbookId, recipe){
      var recipe = recipe;
      var url = '/cookbooks/' + cookbookId + '/recipes';
      $http({
        url: url,
        method: 'PUT',
        data: {
          remove: true,
          label: recipe.label
        }
      })
      .success(function(user){
        $rootScope.cookbookRecipes = user.cookbook.recipes;
        $rootScope.user = user;
        recipe.bookmarked = false;
        if (recipe.label === $rootScope.recipe.label){
          $rootScope.recipe.bookmarked = false;
        }
      })
    }

    this.alreadyInCookbook = function(recipe){
      if($rootScope.user){
        recipe.bookmarked = false;
        var recipes = $rootScope.cookbookRecipes
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            recipe.bookmarked = true
          }
        }
      }
      return recipe
    }
  }

  CookbookService.$inject = ['$http', '$rootScope']

angular
  .module('foodEase')
  .service('CookbookService', CookbookService);
}());
(function(){
  function CookbookService($http, $rootScope, RecipeFactory){
    var recipes;

    this.alreadyInCookbook = function(recipe){
      if($rootScope.user){
        recipe.bookmarked = false;
        var recipes = $rootScope.user.cookbook.recipes;
        for(var i = 0; i < recipes.length; i++){
          if(recipes[i].label === recipe.label){
            recipe.bookmarked = true
          }
        }
      }
      return recipe
    }

    this.addToCookbook = function(cookbookId, recipe){
      var recipe = recipe;
      var url = '/cookbooks/' + cookbookId + '/recipes'
      return $http({
        url: url,
        method: 'PUT',
        data: {
          recipe: recipe
        }
      })
    }

    this.removeFromCookbook = function(cookbookId, recipe){
      var recipe = recipe;
      var url = '/cookbooks/' + cookbookId + '/recipes';
      return $http({
        url: url,
        method: 'PUT',
        data: {
          remove: true,
          label: recipe.label
        }
      })
    }
  }

  CookbookService.$inject = ['$http', '$rootScope', 'RecipeFactory']

angular
  .module('foodEase')
  .service('CookbookService', CookbookService);
}());
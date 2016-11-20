(function(){
  function RecipeService($http, $rootScope){

    this.addToCookbook = function(cookbookId, recipe){
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
        $rootScope.cookbookRecipes = user.cookbook.recipes
        $rootScope.user = user
        })
    }

    this.alreadyInCookbook = function(recipe){
      if($rootScope.user){
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

  RecipeService.$inject = ['$http', '$rootScope']

angular
  .module('foodEase')
  .service('RecipeService', RecipeService);
}());
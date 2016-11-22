(function(){
  function CookbookService($http, $rootScope, RecipeFactory){
    var recipes;
    // this.recipes = function(user){
    //   return user.cookbook.recipes;
    // }
    // debugger;
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
      // .success(function(user){
      //   // recipes = user.cookbook.recipes
      //   // $rootScope.user = user;
      //   debugger;
      //   return user.cookbook.recipes;
      // })
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
      // .success(function(user){
      //   // $rootScope.user = user;
      //   recipe.bookmarked = false;
      //   if (RecipeFactory.recipe && recipe.label === RecipeFactory.recipe.label){
      //     RecipeFactory.recipe.bookmarked = false;
      //   }
      //   debugger;
      //   return user.cookbook.recipes;
      // })
    }
  }

  CookbookService.$inject = ['$http', '$rootScope', 'RecipeFactory']

angular
  .module('foodEase')
  .service('CookbookService', CookbookService);
}());
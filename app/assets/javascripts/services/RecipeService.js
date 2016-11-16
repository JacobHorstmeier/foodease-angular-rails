angular
  .module('reciPlease')
  .service('RecipeService', function($http){

    this.addToCookbook = function(cookbookId, recipe){
      var url = '/cookbooks/' + cookbookId + '/recipes'
      if(Array.isArray(recipe.ingredientLines)) {
        recipe.ingredientLines = recipe.ingredientLines.join('\n')  
      }
      return $http({
        url: url,
        method: 'PUT',
        data: {
          recipe: recipe
        }
      })
    }

    this.removeFromCookbook = function(cookbookId, recipe){
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

  })
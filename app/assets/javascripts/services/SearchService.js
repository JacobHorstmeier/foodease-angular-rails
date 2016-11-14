angular
  .module('reciPlease')
  .service('SearchService', function($http){
    this.getRecipes = function(query){
      var url = 'https://api.edamam.com/search?q=' + query;
      return $http({
        url: url,
        method: 'GET'
      })
    }
    this.getRecipe = function(recipeId){
      var url = 'https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_' + recipeId;
      return $http({
        url: url,
        method: 'GET'
      })
    }
})

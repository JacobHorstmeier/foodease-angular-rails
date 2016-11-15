angular
  .module('reciPlease')
  .service('SearchService', function($http){
    this.getRecipes = function(query){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=11'
      return $http({
        url: url,
        method: 'GET'
      })
    }
    // this.getRecipe = function(recipeId){
    //   var url = 'https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_' + recipeId;
    //   return $http({
    //     url: url,
    //     method: 'GET'
    //   })
    // }
})

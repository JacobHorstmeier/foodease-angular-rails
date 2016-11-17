angular
  .module('reciPlease')
  .service('SearchService', function($http){
    this.getRecipes = function(query, user){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=100'
      // debugger;
      if(user){
        user.healthLabels.forEach(function(label){
          url += '&health=' + label.label
        })
      }
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

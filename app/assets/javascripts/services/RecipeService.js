(function(){
  function RecipeService($http){
    this.recipe = undefined;

    this.getRecipes = function(query, user){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=50'
      if(user){
        user.healthLabels.forEach(function(label){
          url += '&health=' + label.label
        })
      }
      return $http({
        url: url,
        dataType: 'JSONP',
        jsonpCallback: 'callback'
      })
    }
  }
  RecipeService.$inject = ['$http']

  angular
    .module('foodEase')
    .service('RecipeService', RecipeService);
}());
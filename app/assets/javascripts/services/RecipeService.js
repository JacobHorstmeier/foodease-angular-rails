(function(){
  function RecipeService($http){
    this.recipe = undefined;

    this.getRecipes = function(query, user){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=50'
      url += '&app_id=10d42f85&app_key=eebfb150fdd04e3418cd3fb620e91387'
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
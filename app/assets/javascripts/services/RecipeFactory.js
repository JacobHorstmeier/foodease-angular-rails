(function(){
  function RecipeFactory($http){
    // 
    var recipe = function(){
      this.initialize = function(){
        // create recipe
      }
      this.initialize()
    }
    return (recipe);
    // var recipes = [];
    // var recipe;
    // this.getRecipes = function(query, user){
    //   var url = 'https://api.edamam.com/search?q=' + query;
    //   url += '&from=0&to=50'
    //   url += '&alt=json-in-script&callback=JSON_CALLBACK'
    //   if(user){
    //     user.healthLabels.forEach(function(label){
    //       url += '&health=' + label.label
    //     })
    //   }
    //   return $http({
    //     url: url,
    //     method: 'jsonp'
    //   })
    // }
  }
  RecipeFactory.$inject = ['$http']

  angular
    .module('foodEase')
    .service('RecipeFactory', RecipeFactory);
}());
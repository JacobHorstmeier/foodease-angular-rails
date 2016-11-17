angular
  .module('reciPlease')
  .service('SearchService', ['$http', function($http){
    this.getRecipes = function(query, user){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=100'
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
}]);
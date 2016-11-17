(function(){
  function SearchService($http){
    this.getRecipes = function(query, user){
      var url = 'https://api.edamam.com/search?q=' + query;
      url += '&from=0&to=50'
      url += '&callback=angular.callbacks._0'
      if(user){
        user.healthLabels.forEach(function(label){
          url += '&health=' + label.label
        })
      }
      return $http.jsonp(url)
    }
  }
  SearchService.$inject = ['$http']

  angular
    .module('reciPlease')
    .service('SearchService', SearchService);
}());
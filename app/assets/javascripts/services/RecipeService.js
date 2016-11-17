(function(){
  function RecipeService($http){

    this.addToCookbook = function(cookbookId, recipe){
      var url = '/cookbooks/' + cookbookId + '/recipes'
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
  }

  RecipeService.$inject = ['$http']

angular
  .module('reciPlease')
  .service('RecipeService', RecipeService);
}());
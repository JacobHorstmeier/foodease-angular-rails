angular
  .module('reciPlease')
  .service('RecipeService', function($http){

    this.addToCookbook = function(cookbookId, recipe){
      var url = '/cookbooks/' + cookbookId + '/recipes'
      return $http({
        url: url,
        method: 'POST',
        data: {
          recipe: recipe
        }
      })
    }

  })
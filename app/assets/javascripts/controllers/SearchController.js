angular
  .module('reciPlease')
  .controller('SearchController', function($scope, SearchService){    
    var ctrl = this;
    ctrl.query = '';
    ctrl.recipes = [];
    ctrl.recipeSearch = function(query){
      SearchService.getRecipes(query)
        .success(function(response){
          response.hits.forEach(function(recipe){
            recipe.recipe.uri = recipe.recipe.uri.split('_')[1]
            ctrl.recipes.push(recipe.recipe)
          })
        })
    }

  })
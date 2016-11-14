angular
  .module('reciPlease')
  .controller('SearchController', function($scope, Pagination, SearchService){    
    var ctrl = this;
    ctrl.query = '';
    ctrl.recipes = [];
    ctrl.recipeSearch = function(query){
      SearchService.getRecipes(query, from, to)
        .success(function(response){
          response.hits.forEach(function(res){
            res.recipe.uri = res.recipe.uri.split('_')[1]

            ctrl.recipes.push(res.recipe)
          })
        })
    }
  })
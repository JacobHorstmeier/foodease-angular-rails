angular
  .module('reciPlease')
  .controller('SearchController', function($scope, Pagination, Auth, SearchService){ 

    $scope.signedIn = Auth.isAuthenticated;   
    var ctrl = this;
    
    ctrl.recipeSearch = function(query){
      ctrl.recipes = [];
      SearchService.getRecipes(query)
        .success(function(response){
          response.hits.forEach(function(res){
            res.recipe.uri = res.recipe.uri.split('_')[1]
            ctrl.recipes.push(res.recipe)
          })
          ctrl.pagination = Pagination.getNew(10);
          ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);
        })
    };

    ctrl.recipe = null
    ctrl.showRecipe = function(recipe){
      ctrl.recipe = recipe
    }

    ctrl.addToCookbook = function(recipe){
      var user = Auth._currentUser
      user.cookbook.recipes.push(recipe)
    }
  })
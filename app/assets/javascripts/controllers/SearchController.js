angular
  .module('reciPlease')
  .controller('SearchController', function($scope, Pagination, Auth, SearchService, RecipeService){ 

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
    ctrl.showSearchRecipe = function(recipe){
      ctrl.recipe = recipe
    }

    ctrl.addToCookbook = function(recipe){
      var user = Auth._currentUser
      var cookbook = user.cookbook
      RecipeService.addToCookbook(cookbook.id, recipe)
        .success(function(recipe){  
          user.cookbook.recipes.push(recipe)
          debugger;
        })
    }
  })
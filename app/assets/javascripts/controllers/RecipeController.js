angular
  .module('reciPlease')
  .controller('RecipeController', function(recipe){
    var ctrl = this;
    ctrl.recipe = recipe.data[0];
  })
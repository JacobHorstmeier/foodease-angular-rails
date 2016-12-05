var Recipe = {
  templateUrl: 'views/recipe.html',
  controller: 'RecipeController'
}

angular
  .module('foodEase')
  .component('recipe', Recipe)
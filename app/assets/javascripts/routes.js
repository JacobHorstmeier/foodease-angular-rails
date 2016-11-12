(function(){
  'use strict';

  angular
    .module('reciplease')
    .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'some/template.html',
          controller: 'HomeController as home'
        })
        .state('menu', {
          url: '/menu',
          templateUrl: 'some/template.html',
          controller: 'MenuController as menu'
        })
        .state('menu.recipe', {
          url: '/recipe/:id'
          templateUrl: 'some/template.html',
          controller: 'MenuRecipeController as menuRecipe',
          resolve: function($stateParams, RecipeService){
            return RecipeService.getRecipe($stateParams.id);
          }
        })
        .state('shoppingList', {
          url: '/shopping-list',
          templateUrl: 'some/template.html',
          controller: 'ShoppingListController as shoppingList'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'some/template.html',
          controller: 'LoginController as login'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'some/template.html',
          controller: 'SignupController as signup'
        })
    })

}());
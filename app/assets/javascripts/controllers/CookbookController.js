angular
  .module('reciPlease')
  .controller('CookbookController', function(Auth, $scope, Pagination, user){
    var ctrl  = this
    ctrl.user = user
    ctrl.recipes = user.cookbook.recipes
    ctrl.pagination = Pagination.getNew(10);
    ctrl.pagination.numPages = Math.ceil(ctrl.recipes.length/ctrl.pagination.perPage);
    // debugger;
  })


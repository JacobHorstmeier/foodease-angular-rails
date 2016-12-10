(function(){
  function AuthController($scope, Auth, UserService, Flash, CookbookService, $state) {
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    $scope.register = function(){
      Auth.register($scope.user, config).then(function(user){
        CookbookService.recipes = user.cookbook.recipes;
        UserService.user = user;
        console.log(user);
        var message = "Thanks for signing up!"
        Flash.create('success', message, 3000, {container: 'main'})
        $state.go('search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(user){
        console.log(user);
        UserService.user = user;
        CookbookService.recipes = user.cookbook.recipes;
        var message = "Successfully signed in as " + user.username + "!"
        Flash.create('success', message, 3000, {container: 'main'})
        $state.go('search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    }
  }
  AuthController.$inject = ['$scope', 'Auth', 'UserService', 'Flash', 'CookbookService', '$state']

  angular
  .module('foodEase')
  .controller('AuthController', AuthController)
}());
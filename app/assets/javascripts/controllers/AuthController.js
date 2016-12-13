(function(){
  function AuthController($scope, Auth, Flash, GlobalListService, $state) {
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    $scope.register = function(){
      Auth.register($scope.user, config).then(function(user){
        GlobalListService.updateLists(user)
        Flash.create('success', "Thanks for signing up!", 3000, {container: 'main'})
        $state.go('search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(user){
        GlobalListService.updateLists(user)
        var message = "Successfully signed in as " + user.username + "!"
        Flash.create('success', message, 3000, {container: 'main'})
        $state.go('search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    }
  }
  AuthController.$inject = ['$scope', 'Auth', 'Flash', 'GlobalListService', '$state']

  angular
  .module('foodEase')
  .controller('AuthController', AuthController)
}());
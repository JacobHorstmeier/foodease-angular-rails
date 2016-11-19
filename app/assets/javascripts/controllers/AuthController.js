(function(){
  function AuthController($scope, $state, Auth, $state, $rootScope, Flash) {
    $rootScope.state = $state.current.name
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    $scope.register = function(){
      Auth.register($scope.user, config).then(function(user){
        console.log(user);
        var message = "Thanks for signing up!"
        Flash.create('success', message, 3000, {container: 'main'})
        $state.go('home.search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(user){
        console.log(user);
        var message = "Successfully signed in as " + user.username + "!"
        Flash.create('success', message, 3000, {container: 'main'})
        $state.go('home.search');
      }, function(response){
        Flash.create('danger', response.data.error, 3000, {container: 'auth'})
      });
    }
  }
  AuthController.$inject = ['$scope', '$state', 'Auth', '$state', '$rootScope', 'Flash']

  angular
  .module('reciPlease')
  .controller('AuthController', AuthController)
}());
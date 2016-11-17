(function(){
  function AuthController($scope, $state, Auth, $state, $rootScope) {
    $rootScope.state = $state.current.name
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    $scope.register = function(){
      Auth.register($scope.user, config).then(function(registerdUser){
        console.log(registerdUser);
        $state.go('home.search');
      }, function(error){
        console.log(error)
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(registerdUser){
        console.log(registerdUser);
        
        $state.go('home.search');
      }, function(error){
        console.log(error)
      });
    }
  }
  AuthController.$inject = ['$scope', '$state', 'Auth', '$state', '$rootScope']

  angular
  .module('reciPlease')
  .controller('AuthController', AuthController)
}());
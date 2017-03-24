(function(){
  function NavController($location, $scope, $rootScope, Auth, Flash, $state, GlobalListService){

    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path()
    }

    function authorize(){
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.user = user;
      })
    }

    function logout() {
      Auth.logout().then(function(){
        Flash.create('success', 'Successfully logged out. Come back soon!', 3000, {container: 'main'})
      })
    }
    $scope.logout = logout

    $rootScope.$on('devise:new-registration', function(e, user){
      authorize()
    });

    $rootScope.$on('devise:login', function(e, user){
      authorize()
      $state.go('search')
    });

    $rootScope.$on('devise:logout', function(e, user){
      $scope.user = GlobalListService.clearLists();
      $state.go('search')
    });
  }

  NavController.$inject = ['$location', '$scope', '$rootScope', 'Auth', 'Flash', '$state', 'GlobalListService']

  angular
    .module('foodEase')
    .controller('NavController', NavController)
}())
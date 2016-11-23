(function(){
  function NavController($location, $scope, $rootScope, Auth, HealthLabelService, Flash, UserService, $state, SearchService, GlobalListService){

    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path()
    }

    function authorize(){
      Auth.currentUser().then(function(user){
        $scope.user = GlobalListService.user = user;
      })
    }

    $scope.logout = Auth.logout

    $scope.clearData = function(){
      SearchService.recipe = null
      $scope.user = UserService.user = undefined;
      $scope.healthLabels = null
      SearchService.searched = false
      SearchService.searchResults = []
      Flash.create('success', 'Successfully logged out. Come back soon!', 3000, {container: 'main'})
    }

    $rootScope.$on('devise:new-registration', function(e, user){
      $scope.user = UserService.user = user;
      authorize()
    });

    $rootScope.$on('devise:login', function(e, user){
      $scope.user = UserService.user = user;
      $state.go('search.recipe')
      authorize()
    });

    $rootScope.$on('devise:logout', function(e, user){
      $scope.user = UserService.user = undefined;
      $state.go('search.recipe')
    });
  }

  NavController.$inject = ['$location', '$scope', '$rootScope', 'Auth', 'HealthLabelService', 'Flash', 'UserService', '$state', 'SearchService', 'GlobalListService']

  angular
    .module('foodEase')
    .controller('NavController', NavController)
}())
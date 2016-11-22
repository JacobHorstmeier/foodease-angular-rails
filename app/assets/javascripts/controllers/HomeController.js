(function(){
  function HomeController($location, $scope, $rootScope, Auth, HealthLabelService, Flash, CookbookService, UserService, $state){

    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path()
    }

    // if(UserService.user === undefined){
    //   Auth.currentUser().then(function(user){
    //     $scope.user = UserService.user = user
    //     CookbookService.recipes = user.cookbook.recipes;
    //   })
    // }

    $scope.authorize = function(){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
        CookbookService.recipes = user.cookbook.recipes;
        $rootScope.healthLabels = $scope.updateHealthLabels(UserService.user.healthLabels) 
      })
    }
    $scope.authorize()


    $scope.logout = function(){
      Auth.logout()
    }

    $scope.addHealthLabel = function(label){
      HealthLabelService.updateUserLabels('PUT', UserService.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          UserService.user.healthLabels = labels;
        })
    }

    $scope.removeHealthLabel = function(label){
      HealthLabelService.updateUserLabels('DELETE', UserService.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          UserService.user.healthLabels = labels;
        })
    }

    $scope.updateHealthLabels = function(usersLabels){
      HealthLabelService.getLabels()
        .then(function(labels){
          $scope.healthLabels = labels.data;
          $scope.healthLabels.forEach(function(label){
            label.added = false;
            UserService.user.healthLabels.forEach(function(userLabel){
              if(label.label === userLabel.label){
                label.added = true;
              }
            })
          })
        })
    }

    $scope.clearData = function(){
      $rootScope.recipe = null
      $scope.user = UserService.user = undefined;
      $scope.healthLabels = null
      $rootScope.searched = false
      $rootScope.searchRecipes = []
      Flash.create('success', 'Successfully logged out. Come back soon!', 3000, {container: 'main'})
    }

    $rootScope.$on('devise:new-registration', function(e, user){
      UserService.user = user;
      $scope.authorize
    });

    $rootScope.$on('devise:login', function(e, user){
      debugger;
      $scope.user = UserService.user = user;
      $state.go('home.search')
      $scope.authorize()
    });

    $rootScope.$on('devise:logout', function(e, user){
      $scope.user = UserService.user = undefined;
      $state.go('home.search')
    });
  }

  HomeController.$inject = ['$location', '$scope', '$rootScope', 'Auth', 'HealthLabelService', 'Flash', 'CookbookService', 'UserService', '$state']
  
  angular
  .module('foodEase')
  .controller('HomeController', HomeController)
}());
(function(){
  function HomeController($state, $scope, $rootScope, Auth, HealthLabelService, $state, Flash){
    $rootScope.state = $state.current.name

    $scope.authorize = Auth.currentUser().then(function(user){
      $rootScope.user = user
      $rootScope.cookbookRecipes = user.cookbook.recipes
      $scope.updateHealthLabels($rootScope.user.healthLabels) 
    })
    $scope.authorize    

    $rootScope.logout = function(){
      Auth.logout()
    }

    $scope.addHealthLabel = function(label){
      HealthLabelService.updateUserLabels('PUT', $rootScope.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          $rootScope.user.healthLabels = labels;
        })
    }

    $scope.removeHealthLabel = function(label){
      HealthLabelService.updateUserLabels('DELETE', $rootScope.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          $rootScope.user.healthLabels = labels;
        })
    }

    $scope.updateHealthLabels = function(usersLabels){
      HealthLabelService.getLabels()
        .then(function(labels){
          $scope.healthLabels = labels.data;
          $scope.healthLabels.forEach(function(label){
            label.added = false;
            $rootScope.user.healthLabels.forEach(function(userLabel){
              if(label.label === userLabel.label){
                label.added = true;
              }
            })
          })
        })
    }

    $scope.clearData = function(){
      $rootScope.recipe = null
      $rootScope.user = null
      $scope.healthLabels = null
      Flash.create('success', 'Successfully logged out. Come back soon!', 3000, {container: 'main'})
    }

    $rootScope.$on('devise:new-registration', function(e, user){
      $rootScope.user = user;
      $scope.authorize
    });

    $rootScope.$on('devise:login', function(e, user){
      $rootScope.user = user;
      $state.go('home.search')
      $scope.authorize
    });

    $rootScope.$on('devise:logout', function(e, user){
      $rootScope.user = undefined;
      $state.go('home.search')
    });
  }

  HomeController.$inject = ['$state', '$scope', '$rootScope', 'Auth', 'HealthLabelService', '$state', 'Flash']
  
  angular
  .module('reciPlease')
  .controller('HomeController', HomeController)
}());
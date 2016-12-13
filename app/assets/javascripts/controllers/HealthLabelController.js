(function(){
  function HealthLabelController(HealthLabelService, UserService, Auth, $scope, $rootScope){

    $scope.healthLabels = HealthLabelService.allhealthLabels
    var getLabels = HealthLabelService.getLabels;
    var updateLabels = HealthLabelService.updateLabels    
    
    function setupLabels(user){ 
      if(user){
        $scope.user = UserService.user = user
        getLabels().then(function(labels){
          $scope.healthLabels = updateLabels(user.healthLabels, labels.data)
        })
      } else {
        Auth.currentUser().then(function(user){
          $scope.user = UserService.user = user
          $scope.userLabels = user.healthLabels
          getLabels().then(function(labels){
            $scope.healthLabels = updateLabels(user.healthLabels, labels.data)
          })
        })
      }
    }
    
    $scope.addHealthLabel = function(label){
      HealthLabelService.updateUserLabels('PUT', UserService.user.id, label.id)
        .success(function(user){
          $scope.user = UserService.user = user
          $scope.healthLabels = updateLabels(user.healthLabels, $scope.healthLabels)

        })
    }

    $scope.removeHealthLabel = function(label){
      HealthLabelService.updateUserLabels('DELETE', UserService.user.id, label.id)
        .success(function(user){
          $scope.user = UserService.user = user
          $scope.healthLabels = updateLabels(user.healthLabels, $scope.healthLabels)
        })
    }

    setupLabels(UserService.user)

    $rootScope.$on('devise:new-registration', function(e, user){
      $scope.user = UserService.user = user;
      setupLabels()
    });

    $rootScope.$on('devise:login', function(e, user){
      $scope.user = UserService.user = user;
      setupLabels()
    });

    $rootScope.$on('devise:logout', function(e, user){
      $scope.user = UserService.user = undefined;      
      $scope.healthLabels = []
    });
  }

  HealthLabelController.$inject = ['HealthLabelService', 'UserService', 'Auth', '$scope', '$rootScope']

  angular
    .module('foodEase')
    .controller('HealthLabelController', HealthLabelController)
}())
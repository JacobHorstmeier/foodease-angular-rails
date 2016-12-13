(function(){
  function HealthLabelController(HealthLabelService, UserService, Auth, $scope, $rootScope){

    $scope.healthLabels = HealthLabelService.allhealthLabels
    var getLabels = HealthLabelService.getLabels;
        
    $scope.addHealthLabel = function(label){
      HealthLabelService.updateUserLabels('PUT', UserService.user.id, label.id)
        .success(function(user){
          $scope.user = UserService.user = user
          $scope.healthLabels = HealthLabelService.addLabel(label)
        })
    }

    $scope.removeHealthLabel = function(label){
      HealthLabelService.updateUserLabels('DELETE', UserService.user.id, label.id)
        .success(function(user){
          $scope.user = UserService.user = user
          $scope.healthLabels = HealthLabelService.removeLabel(label)
        })
    }
    function setupLabels(){      
      if(UserService.user){
        $scope.user = UserService.user = user
        getLabels().then(function(labels){
          $scope.healthLabels = HealthLabelService.setupLabels(user, labels.data)
        })
      } else {
        Auth.currentUser().then(function(user){
          $scope.user = UserService.user = user
          $scope.userLabels = user.healthLabels
          getLabels().then(function(labels){
            $scope.healthLabels = HealthLabelService.setupLabels(user, labels.data)
          })
        })
      }
    }

    $rootScope.$on('devise:new-registration', function(e, user){
      setupLabels()
    });

    $rootScope.$on('devise:login', function(e, user){
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
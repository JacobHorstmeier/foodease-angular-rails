(function(){
  function HealthLabelController(HealthLabelService, UserService, Auth, $scope){

    $scope.healthLabels = HealthLabelService.allhealthLabels
    var getLabels = HealthLabelService.getLabels;
    var updateLabels = HealthLabelService.updateLabels    

    if(!UserService.user){
      Auth.currentUser().then(function(user){
        $scope.user = UserService.user = user
        $scope.userLabels = user.healthLabels
        getLabels().then(function(labels){
          $scope.healthLabels = updateLabels(UserService.user.healthLabels, labels.data)
        })
      })
    } else {
      $scope.user = UserService.user
      getLabels().then(function(labels){
        $scope.healthLabels = updateLabels(UserService.user.healthLabels, labels)
      })
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
  }

  HealthLabelController.$inject = ['HealthLabelService', 'UserService', 'Auth', '$scope']

  angular
    .module('foodEase')
    .controller('HealthLabelController', HealthLabelController)
}())
angular
  .module('reciPlease')
  .controller('HomeController', function($scope, Auth, HealthLabelService){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    
    $scope.addHealthLabel = function(label){
      var label = JSON.parse(label)
      HealthLabelService.updateUserLabels('PUT', $scope.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          $scope.user.healthLabels = labels;
        })
    }

    $scope.removeHealthLabel = function(label){
      HealthLabelService.updateUserLabels('DELETE', $scope.user.id, label.id)
        .success(function(labels){
          $scope.updateHealthLabels(labels)
          $scope.user.healthLabels = labels;
        })
    }

    $scope.updateHealthLabels = function(usersLabels){
      HealthLabelService.getLabels()
        .then(function(labels){
          $scope.healthLabels = labels.data;
          $scope.healthLabels.forEach(function(label){
            label.added = false;
            $scope.user.healthLabels.forEach(function(userLabel){
              if(label.label === userLabel.label){
                label.added = true;
              }
            })
          })
        })
    }

    Auth.currentUser().then(function(user){
      $scope.user = user
      $scope.updateHealthLabels($scope.user.healthLabels) 
    })

    Auth.currentUser().then(function(user){
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function(e, user){
      $scope.user = user;
    });

    $scope.$on('devise:login', function(e, user){
      $scope.user = user;
    });

    $scope.$on('devise:logout', function(e, user){
      $scope.user = {};
    });
  })
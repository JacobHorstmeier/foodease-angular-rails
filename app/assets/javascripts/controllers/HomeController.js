angular
  .module('reciPlease')
  .controller('HomeController', function($scope, Auth, HealthLabelService){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    
    HealthLabelService.getLabels()
      .then(function(labels){
        $scope.healthLabels = labels.data;
      })

    $scope.addHealthLabel = function(label){
      HealthLabelService.getLabels('PUT', $scope.user.id, label.id)
        .succes(function(labels){
          $scope.healthLabels = labels;
        })
    }


    Auth.currentUser().then(function(user){
      $scope.user = user    
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
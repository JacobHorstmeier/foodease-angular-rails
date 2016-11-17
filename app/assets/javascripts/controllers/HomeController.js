(function(){
  function HomeController($scope, $rootScope, Auth, HealthLabelService){
    $rootScope.signedIn = Auth.isAuthenticated;
    // debugger;
    $rootScope.logout = Auth.logout;
    
    $scope.addHealthLabel = function(label){
      var label = JSON.parse(label)
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

    Auth.currentUser().then(function(user){
      $rootScope.user = user
      // debugger;
      $scope.updateHealthLabels($rootScope.user.healthLabels) 
    })

    Auth.currentUser().then(function(user){
      $scope.user = user;
    });

    $scope.clearData = function(){
      $rootScope.recipe = null
      $rootScope.user = null
      $scope.healthLabels = null
    }

    $scope.$on('devise:new-registration', function(e, user){
      $rootScope.user = user;
    });

    $scope.$on('devise:login', function(e, user){
      $rootScope.user = user;
    });

    $scope.$on('devise:logout', function(e, user){
      $rootScope.user = undefined;
    });
  }

  HomeController.$inject = ['$scope', '$rootScope', 'Auth', 'HealthLabelService']
  
  angular
  .module('reciPlease')
  .controller('HomeController', HomeController)
}());
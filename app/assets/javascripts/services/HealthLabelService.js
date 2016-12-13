(function(){
  function HealthLabelService($http, UserService){
    var allHealthLabels = this.allHealthLabels
    var userHealthLabels = this.userHealthLabels

    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health_labels/' + healthLabelId;
      return $http({url: url, method: method});
    }

    this.setupLabels = function(user, allHealthLabels){
      allHealthLabels.forEach(function(label){
        label.added = false;
        user.healthLabels.forEach(function(userLabel){
          if(label.label === userLabel.label){
            label.added = true;
          }
        })
      })
      return this.allHealthLabels = allHealthLabels
    }

    this.removeLabel = function(removedLabel){
      this.allHealthLabels.forEach(function(label){
        if(label.label === removedLabel.label){
          label.added = false;
        }
      })
      return this.allHealthLabels
    }

    this.addLabel = function(addedLabel){
      this.allHealthLabels.forEach(function(label){
        if(label.label === addedLabel.label){
          label.added = true;
        }
      })
      return this.allHealthLabels
    }
  }

  HealthLabelService.$inject = ['$http', 'UserService']
  
  angular
    .module('foodEase')
    .service('HealthLabelService', HealthLabelService);
}());
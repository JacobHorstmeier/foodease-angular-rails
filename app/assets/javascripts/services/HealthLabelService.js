(function(){
  function HealthLabelService($http, UserService){
    var allHealthLabels, userHealthLabels;

    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health_labels/' + healthLabelId;
      return $http({url: url, method: method});
    }

    this.updateLabels = function(userLabels, allLabels){
      userHealthLabels = userLabels;
      allHealthLabels = allLabels;
      allHealthLabels.forEach(function(label){
        label.added = false;
        userLabels.forEach(function(userLabel){
          if(label.label === userLabel.label){
            label.added = true;
          }
        })
      })
      return allHealthLabels
    }
  }

  HealthLabelService.$inject = ['$http', 'UserService']
  
  angular
    .module('foodEase')
    .service('HealthLabelService', HealthLabelService);
}());
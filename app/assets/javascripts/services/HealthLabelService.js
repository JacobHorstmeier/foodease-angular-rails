angular
  .module('reciPlease')
  .service('HealthLabelService', function($http){

    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health-labels/' + healthLabelId;
      return $http({url: url, method: method});
    }
  })
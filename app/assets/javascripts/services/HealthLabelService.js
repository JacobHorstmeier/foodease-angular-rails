angular
  .module('reciPlease')
  .service('HealthLabelService', ['$http', function($http){

    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health_labels/' + healthLabelId;
      return $http({url: url, method: method});
    }
  }]);
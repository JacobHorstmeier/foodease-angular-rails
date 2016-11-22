(function(){
  function HealthLabelService($http){
    var service = this
    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health_labels/' + healthLabelId;
      return $http({url: url, method: method});
    }
  }

  HealthLabelService.$inject = ['$http']
  
  angular
    .module('foodEase')
    .service('HealthLabelService', HealthLabelService);
}());
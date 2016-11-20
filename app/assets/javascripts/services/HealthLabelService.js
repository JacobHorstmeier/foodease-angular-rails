(function(){
  function HealthLabelService($http, $rootScope){
    var service = this
    this.getLabels = function(){
      return $http.get("/health_labels")
    }

    this.updateUserLabels = function(method, userId, healthLabelId){
      var url = '/users/' + userId + '/health_labels/' + healthLabelId;
      return $http({url: url, method: method});
    }

    // service.updateHealthLabels = function(usersLabels){
    //   service.getLabels()
    //     .then(function(labels){
    //       healthLabels = labels.data;
    //       healthLabels.forEach(function(label){
    //         label.added = false;
    //         $rootScope.user.healthLabels.forEach(function(userLabel){
    //           if(label.label === userLabel.label){
    //             label.added = true;
    //           }
    //         })
    //       })
    //       return healthLabels
    //     })
    //   }
  }

  HealthLabelService.$inject = ['$http', '$rootScope']
  
angular
  .module('foodEase')
  .service('HealthLabelService', HealthLabelService);
}());
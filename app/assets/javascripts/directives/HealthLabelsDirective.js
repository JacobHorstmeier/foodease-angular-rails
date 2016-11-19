function HealthLabels(Auth, HealthLabelService, $compile){
  return {
    templateUrl: 'views/healthLabels.html',
    controller: 'HomeController'
  }
}

HealthLabels.$inject = ['Auth', 'HealthLabelService', '$compile']

angular
  .module('reciPlease')
  .directive('healthLabels', HealthLabels)
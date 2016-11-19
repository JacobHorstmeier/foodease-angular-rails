function HealthLabels(){
  return {
    templateUrl: 'views/healthLabels.html',
    controller: 'HomeController'
  }
}

angular
  .module('reciPlease')
  .directive('healthLabels', HealthLabels)
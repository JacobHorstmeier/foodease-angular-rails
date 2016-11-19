function DeskNav(){
  return {
    templateUrl: 'views/deskNav.html',
    controller: 'HomeController'
  }
}
angular
  .module('reciPlease')
  .directive('deskNav', DeskNav)
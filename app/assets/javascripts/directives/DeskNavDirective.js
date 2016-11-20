function DeskNav(){
  return {
    templateUrl: 'views/deskNav.html',
    controller: 'HomeController'
  }
}
angular
  .module('foodEase')
  .directive('deskNav', DeskNav)
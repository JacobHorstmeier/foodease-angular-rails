function MobileNav(){
  return {
    templateUrl: 'views/mobileNav.html',
    controller: 'HomeController'
  }
}

angular
  .module('reciPlease')
  .directive('mobileNav', MobileNav)
function MobileNav(){
  return {
    templateUrl: 'views/mobileNav.html',
    controller: 'HomeController'
  }
}

angular
  .module('foodEase')
  .directive('mobileNav', MobileNav)
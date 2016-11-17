(function(){
  function HomeDirective(){
    return {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      compile: function(Auth, $rootScope){
        debugger;
        Auth.currentUser().then(function(user){
          $rootScope.user = user;
          debugger;
        }, function(error){
          debugger;
        });
        // $rootScope.signedIn
      }

    }
  }

  angular
    .module('reciPlease')
    .directive('home', HomeDirective)
}())

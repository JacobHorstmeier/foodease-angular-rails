(function(){
  function UserService(){
    var user = {};

    // this.getUser = function(){
    //   Auth.currentUser().then(function(user){
    //     return user
    //   })
    // }
  }

  // UserService.$inject = []

  angular
    .module('foodEase')
    .service('UserService', UserService)
}())

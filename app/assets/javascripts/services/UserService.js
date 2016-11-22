(function(){
  function UserService(Auth){
    var user;

    this.getUser = function(){
      Auth.currentUser().then(function(user){
        return user
      })
    }
  }

  UserService.$inject = ['Auth']

  angular
    .module('foodEase')
    .service('UserService', UserService)
}())

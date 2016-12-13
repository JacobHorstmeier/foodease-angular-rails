(function(){
  function UserService(){
    this.user = undefined;
  }

  angular
    .module('foodEase')
    .service('UserService', UserService)
}())

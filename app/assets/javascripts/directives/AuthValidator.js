// function AuthValidator() {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function(scope, elem, attrs, ngModel) {
//       ngModel.$validators.validPassword = function(value){
//         return someRegex.test(value)
//       }
//     }
//   }
// }
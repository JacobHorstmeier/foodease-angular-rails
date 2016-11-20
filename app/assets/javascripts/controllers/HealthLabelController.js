// (function(){
//   function HealthLabelController(Auth, $scope, $rootScope, HealthLabelService){
    
//     $scope.authorize = function(){
//       Auth.currentUser().then(function(user){
//         $rootScope.user = user
//         $rootScope.cookbookRecipes = user.cookbook.recipes
//         $rootScope.healthLabels = $scope.updateHealthLabels($rootScope.user.healthLabels) 
//         // debugger;
//       })
//     }
//     $scope.authorize()

//     // function getLabels(){
//     //   Auth.currentUser().then(function(user){
//     //     debugger;
//     //   })
//     // }

//     $scope.addHealthLabel = function(label){
//       HealthLabelService.updateUserLabels('PUT', $rootScope.user.id, label.id)
//         .success(function(labels){
//           $rootScope.healthLabels = HealthLabelService.updateHealthLabels(labels)
//           $rootScope.user.healthLabels = labels;
//         })
//     }

//     $scope.removeHealthLabel = function(label){
//       HealthLabelService.updateUserLabels('DELETE', $rootScope.user.id, label.id)
//         .success(function(labels){
//           $rootScope.healthLabels = HealthLabelService.updateHealthLabels(labels)
//           $rootScope.user.healthLabels = labels;
//         })
//     }

//     $scope.updateHealthLabels = function(usersLabels){
//       HealthLabelService.getLabels()
//         .then(function(labels){
//           $scope.healthLabels = labels.data;
//           $scope.healthLabels.forEach(function(label){
//             label.added = false;
//             $rootScope.user.healthLabels.forEach(function(userLabel){
//               if(label.label === userLabel.label){
//                 label.added = true;
//               }
//             })
//           })
//         })
//   }

//   HealthLabelController.$inject = ['Auth', '$scope', '$rootScope', 'HealthLabelService']

//   angular
//     .module('foodEase')
//     .controller('HealthLabelController', HealthLabelController)
// }())
var PageHeader = {
  templateUrl: 'views/pageHeader.html',
  controller: 'HomeController'
}

angular
  .module('foodEase')
  .component('pageHeader', PageHeader)
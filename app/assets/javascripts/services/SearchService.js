(function(){
  function SearchService(Pagination){

    var pagination, query, noResults, searchResults, searched;
    
    this.paginate = function(recipeCount){
      pagination = Pagination.getNew(10);
      pagination.numPages = Math.ceil(recipeCount/pagination.perPage);
      return pagination;
    }
  }
  SearchService.$inject = ['Pagination']

  angular
    .module('foodEase')
    .service('SearchService', SearchService);
}());
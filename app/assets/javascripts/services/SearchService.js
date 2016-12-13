(function(){
  function SearchService(Pagination){

    this.pagination;
    this.query;
    this.searchResults;
    this.searched;
    
    this.paginate = function(recipeCount){
      this.pagination = Pagination.getNew(10);
      this.pagination.numPages = Math.ceil(recipeCount/this.pagination.perPage);
      return this.pagination;
    }
  }
  SearchService.$inject = ['Pagination']

  angular
    .module('foodEase')
    .service('SearchService', SearchService);
}());
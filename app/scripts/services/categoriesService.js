(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name myApp:CategoriesService
   *
   * @description
   * Service to treat with Categories functionality
   *
   * */
  angular.module('softruckFoursquareApp')
    .service('CategoriesService', function () {

      this.findCategoriesInAList = function (list) {
        var categoriesList = [];
        var i;
        var locals = list.data.response.venues;
        var localsLength = locals.length;

        for (i = 0; i < localsLength; i++) {
          var j;
          var localCategories = locals[i].categories;
          var localCategoriesLength = localCategories.length;

          for (j = 0; j < localCategoriesLength; j++) {
            if (!categoriesList.contains(localCategories[j].shortName)) {
              categoriesList.push(localCategories[j]);
            }
          }
        }

        return categoriesList;
      };
    });
})();


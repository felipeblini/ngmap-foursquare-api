(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name myApp:localsFactory
   *
   * @description
   *
   *
   * */
  angular.module('softruckFoursquareApp')
    .factory('LocalsDataFactory', function ($http, APP_CONSTANTS) {

      var resource = APP_CONSTANTS.FOURSQUARE_SEARCH_URL;

      var API = {};

      API.getCategories = function(latlong) {
        return $http.get(resource, {
          params: {
            "client_id": APP_CONSTANTS.FOURSQUARE_CLIENT_ID,
            "client_secret": APP_CONSTANTS.FOURSQUARE_CLIENT_SECRET,
            "v": 20130815,
            "ll": latlong
          }
        })
      };

      return {
        api: API
      };
    });
})();

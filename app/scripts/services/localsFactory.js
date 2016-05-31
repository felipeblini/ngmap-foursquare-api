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

      var resource = APP_CONSTANTS.FOURSQUARE_API_URL;

      var API = {};

      API.getCategories = function(latlong) {
        var type = 'search';

        return $http.get(resource + '/' + type, {
          params: {
            "client_id": APP_CONSTANTS.FOURSQUARE_CLIENT_ID,
            "client_secret": APP_CONSTANTS.FOURSQUARE_CLIENT_SECRET,
            "v": 20130815,
            "ll": latlong
          }
        })
      };

      API.getToFivePlaces = function(latlong) {
        var type = 'explore';

        return $http.get(resource + '/' + type, {
          params: {
            "client_id": APP_CONSTANTS.FOURSQUARE_CLIENT_ID,
            "client_secret": APP_CONSTANTS.FOURSQUARE_CLIENT_SECRET,
            "v": 20130815,
            "ll": latlong,
            "limit": 5
          }
        })
      };

      return {
        api: API
      };
    });
})();

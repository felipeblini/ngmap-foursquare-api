(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name myApp:geolocation
   *
   * @description
   *
   *
   * */
  angular.module('softruckFoursquareApp')
    .service('GeolocationService', function ($http, APP_CONSTANTS) {

      var resource = 'https://www.googleapis.com/geolocation/v1/geolocate';

      this.getUserLocation = function () {
          return $http.post(resource + '?key=' + APP_CONSTANTS.GOOGLE_MAPS_KEY);
        };
    });
})();


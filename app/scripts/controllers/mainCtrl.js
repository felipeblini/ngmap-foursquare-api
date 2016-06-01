(function(){
    'use strict';

    /**
     * @ngdoc function
     * @name softruckFoursquareApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the softruckFoursquareApp
     */
    angular.module('softruckFoursquareApp')
      .controller('MainCtrl', function ($rootScope, GeolocationService) {
        var vm = this;

        vm.initialLatLong = { latlong: '-19.9208300, -43.9377800' };

        $rootScope.mapMarkers = [];
        $rootScope.mapMarkers.push(vm.initialLatLong);
        $rootScope.userLocation = vm.initialLatLong.latlong;

        GeolocationService.getUserLocation()
          .then(function (response) {
            var latlong;
            latlong = response.data.location.lat + ',' + response.data.location.lng;

            $rootScope.mapMarkers = [];
            $rootScope.mapMarkers.push({ latlong:  latlong});
            $rootScope.userLocation = latlong;

            console.log('user location', latlong);
          })
      });
}());

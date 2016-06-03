(function(){
    'use strict';

    /**
     * @ngdoc function
     * @name softruckFoursquareApp.controller:MapCtrl
     * @description
     * # MapCtrl
     * Controller of the map
     */
    angular.module('softruckFoursquareApp')
      .controller('MapCtrl', function ($rootScope, $timeout, NgMap, GeolocationService) {
        var vm = this;

        $rootScope.totalPlacesFound = 0;

        $rootScope.alerts = [];

        $rootScope.closeAlert = function(index) {
          $rootScope.alerts.splice(index, 1);
        };

        vm.initialMarker = {
          id:'1',
          name: 'Belo Horizonte',
          position: [-19.9208300, -43.9377800]
        };

        $rootScope.hideMap = false;

        $rootScope.taxiData = [];

        $rootScope.heatmap = false;

        $rootScope.cidadeLatLong = '0';

        NgMap.getMap().then(function(map) {
          $rootScope.map = map;
          $rootScope.heatmap = $rootScope.map.heatmapLayers.heatlay;
        });

        vm.showDetail = function(e, shop) {
          vm.shop = shop;
          $rootScope.map.showInfoWindow('foo-iw', shop.id);
        };

        $rootScope.mapMarkers = [];
        $rootScope.mapMarkers.push(vm.initialMarker);
        $rootScope.userLocation = vm.initialMarker.position;

        init();

        function init() {
          GeolocationService.getUserLocation()
            .then(function (response) {
              var lat, long;
              lat = response.data.location.lat;
              long = response.data.location.lng;

              $rootScope.mapMarkers = [];

              $rootScope.mapMarkers.push({
                id:'userLocation',
                name: 'My Location',
                position: [lat, long],
              });

              $rootScope.userLocation = lat + ',' + long;

              $rootScope.totalPlacesFound = 1;
            });
        }
      });
}());

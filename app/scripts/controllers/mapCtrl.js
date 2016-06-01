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
        var heatmap, vm = this;

        vm.initialMarker = {
          id:'1',
          name: 'Belo Horizonte',
          position: [-19.9208300, -43.9377800]
        };

        var taxiData = [
          new google.maps.LatLng(vm.initialMarker.position[0], vm.initialMarker.position[1])
        ]

        $rootScope.hideMap = false;

        $rootScope.taxiData = [];

        $rootScope.heatmap = false;

        NgMap.getMap().then(function(map) {
          console.log('map', map);
          $rootScope.map = map;
          $rootScope.heatmap = $rootScope.map.heatmapLayers.heatlay;
        });

        $timeout(function () {
          //$rootScope.heatmap.data.j = [];
          //$rootScope.hideMap = true;
        }, 1500);

        console.log('$rootScope.taxiData', $rootScope.taxiData);

        $rootScope.showHeatMap = function () {
          $rootScope.taxiData = [
            new google.maps.LatLng(vm.initialMarker.position[0], vm.initialMarker.position[1]),
            new google.maps.LatLng(vm.initialMarker.position[0], vm.initialMarker.position[1]),
            new google.maps.LatLng(vm.initialMarker.position[0], vm.initialMarker.position[1])
          ];

          NgMap.getMap().then(function(map) {
            $rootScope.heatmap.data.j = [];
            $rootScope.hideMap = true;
            $rootScope.heatmap.data.j = $rootScope.taxiData;

            $timeout(function () {
              $rootScope.hideMap = false;
              google.maps.event.trigger(map,'resize');
            }, 100);
          });
        };

        $rootScope.cleanHeatMap = function () {
          $rootScope.taxiData = [];

          NgMap.getMap().then(function(map) {
            $rootScope.heatmap.data.j = [];
            $rootScope.hideMap = true;
            $rootScope.heatmap.data.j = $rootScope.taxiData;

            $timeout(function () {
              $rootScope.hideMap = false;
              google.maps.event.trigger(map,'resize');
            }, 100);
          });
        };

        // vm.toggleHeatmap = function(event) {
        //   heatmap.setMap(heatmap.getMap() ? null : vm.map);
        // };

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

              console.log('user location', [lat, long]);
            });
        }
      });
}());

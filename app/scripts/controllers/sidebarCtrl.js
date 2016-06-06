(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name softruckFoursquareApp.controller:SideBarCtrl
   * @description
   * # SideBarCtrl
   * Controller of the sidebar menu
   */
  angular
    .module('softruckFoursquareApp')
    .controller('SideBarCtrl', function($scope, $rootScope, $timeout, NgMap, LocalsDataFactory, GeolocationService, CategoriesService) {

      var placesDataFactory = LocalsDataFactory.api;

      var gm = window.google.maps;

      $scope.categories = [];
      $scope.TopFiveNearby = [];

      $rootScope.categoryId = '';
      $rootScope.radius = 100;

      $scope.sliderOptions = {
        from: 5,
        to: 300,
        floor: true,
        step: 5,
        dimension: ' km',
        vertical: false,
        css: {
          background: {'background-color': 'silver'},
          before: {'background-color': '#333'},
          after: {'background-color': '#333'},
          pointer: {'background-color': '#ccc'}
        },
        callback: function(sliderRadiusValue) {
          console.log(sliderRadiusValue);
          getPlaceByCategoryIdAndRadius(undefined, sliderRadiusValue);
        }
      };

      init();

      function init() {
        // build sidebar
        getUserGeolocation()
          .then(function(userLocation) {
            getPlacesAroundLatLong(userLocation)
              .then(function (placesList) {
                $scope.categories = CategoriesService.findCategoriesInAList(placesList);
              })
              .catch(function (error) {
                console.log('Not possible to get the places list', error);
              });

            return userLocation;
          })
          .then(function (userLocation) {
            if(userLocation) {
              getTopFivePlaces(userLocation)
                .then(function(theTopFivePlaces) {
                  $scope.TopFiveNearby = theTopFivePlaces.data.response.groups[0].items;
                });
            } else {
              console.log('No data to get top 5 places nearby user');
            }
          })
          .catch(function (error) {
            console.log('Not possible to get the user geolocation', error);
          });
      }

      function getTopFivePlaces(userLocation) {
        var latlong;
        latlong = userLocation.data.location.lat + ',' + userLocation.data.location.lng;

        return placesDataFactory.getTopFivePlaces(latlong);
      }

      function getUserGeolocation() {
        return GeolocationService.getUserLocation();
      }

      function getPlacesAroundLatLong(latlong) {
        var location;
        location = latlong.data.location.lat + ',' + latlong.data.location.lng;

        return placesDataFactory.getPlacesAroundLatLong(location);
      }

      function getPlaceByCategoryIdAndRadius (catId, rad) {
        if(catId) {
          $rootScope.categoryId = catId;
        }

        if(rad) {
          $rootScope.radius = rad;
        }

        var params = {
          ll: $rootScope.userLocation,
          categoryId: $rootScope.categoryId,
          radius: $rootScope.radius
        };

        placesDataFactory.getByCategoryIdAndRadius(params)
          .then(function(response) {
            fetchPlacesAndShowOnMap(response);
          })
          .catch(function (error) {
            console.log('Unable to get places by categoryId and radius due error', error);
          });
      }

      var fetchPlacesAndShowOnMap = function (list) {
        var data = list.data.response.venues;
        var dataLength = data.length;
        var i;

        showAlert(dataLength);

        $rootScope.mapMarkers = [];

        for(i = 0; i < dataLength; i++) {
          var lat, lon, placeParam;
          lat = data[i].location.lat;
          lon = data[i].location.lng;

          placeParam = {
            id: data[i].id,
            name: data[i].name,
            position: [lat, lon]
          };

          // Show new places
          $rootScope.mapMarkers.push(placeParam);
        }

        // Clean heatmap to show the new places
        cleanHeatMap();
      };

      $scope.findByCategoryAndRadius = getPlaceByCategoryIdAndRadius;

      $scope.markTopFiveOnMap = function(params) {
        console.log(params);
        var lat, long, name, id, checkins, users, total;
        lat = params.lat;
        long = params.lng;
        name = params.name;
        id = params.id;
        checkins = params.checkins;
        users = params.users;

        total = checkins || users;

        $rootScope.mapMarkers = [];

        $rootScope.mapMarkers.push({
          id: id,
          name: name,
          position:[lat, long],
          checkins: total + ' estiveram aqui'
        });

        cleanHeatMap();
      };

      var cleanHeatMap = function () {
        $rootScope.taxiData = [];

        NgMap.getMap().then(function(map) {
          $rootScope.heatmap.data.j = [];
          $rootScope.hideMap = true;
          $rootScope.heatmap.data.j = $rootScope.taxiData;

          map.zoom = 3;

          $timeout(function () {
            $rootScope.hideMap = false;
            gm.event.trigger(map,'resize');
          }, 100);
        });
      };

      $rootScope.showHeatMap = function () {
        $rootScope.taxiData = [];

        //get places
        var latlongParam = {
          data: {
            location: {
              lat: $scope.latlongHeatMap.split(',')[0],
              lng: $scope.latlongHeatMap.split(',')[1]
            }
          }
        };

       getPlacesAroundLatLong(latlongParam)
          .then(function (placesList) {
            console.log('placesList', placesList);
            var data = placesList.data.response.venues;
            var dataLength = data.length;
            var i, lat, lng;

            showAlert(dataLength);

            for(i = 0; i < dataLength; i++) {
              lat = data[i].location.lat;
              lng = data[i].location.lng;

              $rootScope.taxiData.push(new gm.LatLng(lat, lng));
            }

            var newMarker = {
              id: $scope.nameHeatMap,
              name: '',
              position: [lat, lng]
            };

            $rootScope.mapMarkers = [];
            $rootScope.mapMarkers.push(newMarker);

            $rootScope.map.zoom = 1;
          });

        NgMap.getMap().then(function(map) {
          $rootScope.heatmap.data.j = [];
          $rootScope.hideMap = true;
          $rootScope.heatmap.data.j = $rootScope.taxiData;

          $timeout(function () {
            $rootScope.hideMap = false;
            map.zoom = 5;
            gm.event.trigger(map,'resize');
          }, 1500);
        });
      };

      function showAlert(dataLength) {
        var msgType = 'success';

        $rootScope.totalPlacesFound = dataLength;

        if(dataLength === 0) {
          msgType = 'warning';
        }

        $rootScope.alerts = [{ type: msgType }];
      }
    });
}());

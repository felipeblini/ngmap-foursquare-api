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
        .controller('SideBarCtrl', function($scope, $rootScope, $timeout, NgMap, LocalsDataFactory, GeolocationService) {

          var dataFactory = LocalsDataFactory.api;

          $scope.categories = [];
          $scope.TopFiveNearby = [];

          $rootScope.categoryId = '';
          $rootScope.radius = 100;

          $scope.sliderOptions = {
            from: 5,
            to: 300,
            floor: true,
            step: 5,
            dimension: " km",
            vertical: false,
            css: {
              background: {"background-color": "silver"},
              before: {"background-color": "#333"},
              after: {"background-color": "#333"},
              pointer: {"background-color": "#ccc"}
            },
            callback: function(sliderRadiusValue) {
              console.log(sliderRadiusValue);
              getPlaceByCategoryIdAndRadius(undefined, sliderRadiusValue)
            }
          };

          init();

          function init() {
            getUserGeolocation()
              .then(function(userLocation) {
                getCategories(userLocation)
                  .then(function (placesList) {
                    $scope.categories = fetchCategories(placesList);
                  })
                  .catch(function (error) {
                    console.log("Not possible to get the places list", error);
                  })

                return userLocation;
              })
              .then(function (userLocation) {
                if(userLocation) {
                  getTopFivePlaces(userLocation)
                    .then(function(theTopFivePlaces) {
                      $scope.TopFiveNearby = theTopFivePlaces.data.response.groups[0].items;
                    });
                } else {
                  console.log("No data to get top 5 places nearby user", error);
                }
              })
              .catch(function (error) {
                console.log("Not possible to get the user geolocation", error);
              });
          }

          function getTopFivePlaces(userLocation) {
            var latlong;
            latlong = userLocation.data.location.lat + ',' + userLocation.data.location.lng;

            return dataFactory.getTopFivePlaces(latlong);
          }

          function getUserGeolocation() {
            return GeolocationService.getUserLocation();
          }

          function getCategories(userLocation) {
            var latlong;
            latlong = userLocation.data.location.lat + ',' + userLocation.data.location.lng;
            console.log(dataFactory.getCategories(latlong));

            return dataFactory.getCategories(latlong);
          }

          function fetchCategories(response) {
            var categoriesList = [];
            var i;
            var locals = response.data.response.venues;
            var localsLength = locals.length;

            for (i = 0; i < localsLength; i++) {
              var j;
              var localCategories = locals[i].categories;
              var localCategoriesLength = localCategories.length;

              for (j = 0; j < localCategoriesLength; j++) {
                if(!categoriesList.contains(localCategories[j].shortName))
                  categoriesList.push(localCategories[j]);
              }
            }

            return categoriesList;
          }

          function getPlaceByCategoryIdAndRadius (catId, rad) {
            if(catId)
              $rootScope.categoryId = catId;

            if(rad)
              $rootScope.radius = rad;

            var params = {
              ll: $rootScope.userLocation,
              categoryId: $rootScope.categoryId,
              radius: $rootScope.radius
            };

            console.log('Searching place by categoryId and radius', params);

            dataFactory.getByCategoryIdAndRadius(params)
              .then(function (result) {
                var data = result.data.response.venues;
                var dataLength = data.length;
                var i;

                console.log('data', data);

                $rootScope.mapMarkers = [];

                for(i = 0; i < dataLength; i++) {
                  var lat, lon, place;
                  lat = data[i].location.lat;
                  lon = data[i].location.lng;

                  place = {
                    id: data[i].id,
                    name: data[i].name,
                    position: [lat, lon]
                  }

                  console.log(place);

                  // Clean heatmap to show the new places
                  cleanHeatMap();

                  // Show new places
                  $rootScope.mapMarkers.push(place);
                }
              })
              .catch(function (error) {
                console.log('Unable to get places by categoryId and radius due error', error);
              });
          }

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

            console.log($rootScope.mapMarkers);

            $rootScope.mapMarkers = [];

            $rootScope.mapMarkers.push({
              id: id,
              name: name,
              position:[lat, long],
              checkins: total + ' estiveram aqui'
            });

            console.log($rootScope.mapMarkers);

            cleanHeatMap();
          }

          var cleanHeatMap = function () {
            $rootScope.taxiData = [];

            NgMap.getMap().then(function(map) {
              $rootScope.heatmap.data.j = [];
              $rootScope.hideMap = true;
              $rootScope.heatmap.data.j = $rootScope.taxiData;

              map.zoom = 3;

              $timeout(function () {
                $rootScope.hideMap = false;
                google.maps.event.trigger(map,'resize');
              }, 100);
            });
          };
    });
}());

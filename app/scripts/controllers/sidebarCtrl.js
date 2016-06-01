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
        .controller('SideBarCtrl', function($scope, $rootScope, LocalsDataFactory, GeolocationService) {

          $scope.categories = [];
          $scope.TopFiveNearby = [];

          $rootScope.categoryId = '';
          $rootScope.radius = 100;

          var dataFactory = LocalsDataFactory.api;

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
              getByCategoryIdAndRadius(undefined, sliderRadiusValue)
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
            console.log('getting top 5 places', userLocation);
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

          function getByCategoryIdAndRadius (catId, rad) {
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

                $rootScope.mapMarkers = [];

                for(i = 0; i < dataLength; i++) {
                  var latlon = data[i].location.lat + ',' + data[i].location.lng;
                  $rootScope.mapMarkers.push({ latlong:  latlon});
                }
              })
              .catch(function (error) {
                console.log('Unable to get places by categoryId and radius due error', error);
              });
          }

          $scope.findByCategoryAndRadius = getByCategoryIdAndRadius;

          $scope.markOnMap = function(params) {
            var latlng = params.lat + ',' + params.lng;

            console.log($rootScope.mapMarkers);

            $rootScope.mapMarkers = [];
            $rootScope.mapMarkers.push({ latlong:  latlng});

            console.log($rootScope.mapMarkers);
          }
    });
}());

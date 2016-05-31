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
        .controller('SideBarCtrl', function($scope, LocalsDataFactory, GeolocationService) {

          $scope.categories = [];
          $scope.TopFiveNearby = [];

          var dataFactory = LocalsDataFactory.api;

          $scope.sliderOptions = {
            from: 5,
            to: 100,
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
            callback: function(value) {
              console.log(value);
              //$scope.distance = value;
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
                    .then(function(places) {
                      console.log('places', places.data.response.groups[0].items);
                      $scope.TopFiveNearby = places.data.response.groups[0].items;
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

            return dataFactory.getToFivePlaces(latlong);
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
            console.log("Locals", locals);

            console.log('getting categories...');

            for (i = 0; i < localsLength; i++) {
              var j;
              var localCategories = locals[i].categories;
              var localCategoriesLength = localCategories.length;

              for (j = 0; j < localCategoriesLength; j++) {
                if(!categoriesList.contains(localCategories[j].shortName))
                  categoriesList.push(localCategories[j]);
              }
            }
            console.log("Categories Factory", categoriesList);

            return categoriesList;
          }
    });
}());

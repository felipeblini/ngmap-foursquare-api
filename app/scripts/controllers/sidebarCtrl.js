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
          $scope.TopFive = [];

          var dataFactory = LocalsDataFactory.api;

          init();

          function init() {
            getUserGeolocation()
              .then(function(response) {
                getCategories(response)
                  .then(function (result) {
                    $scope.categories = fetchCategories(result);
                  })
                  .catch(function (error) {
                    console.log("Not possible to get the categories list", error);
                  })
              })
              .catch(function (error) {
                console.log("Not possible to get the user geolocation", error);
              })
              .then(function(response) {
                $scope.TopFive = getTopFive(response);
              });
          }

          function getTopFive(response) {
            return [
              {id: 1, name: 'Location 1'},
              {id: 2, name: 'Location 2'},
              {id: 3, name: 'Location 3'},
              {id: 4, name: 'Location 4'},
              {id: 6, name: 'Location 5'}
            ];
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
                categoriesList.push(localCategories[j]);
              }
            }
            console.log("Categories Factory", categoriesList);

            return categoriesList;
          }
    });
}());

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
      .controller('MainCtrl', function () {
        var vm = this;

        vm.mapMarkers = [];

        vm.LatLong = '-19.9208300, -43.9377800';

        vm.mapMarkers[0] = { latlong:  vm.BHLatLong};

        vm.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
      });
}());

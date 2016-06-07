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
        vm.mapMarker = [];
        
        vm.mapMarker[0] = '46.000, -23.980';
        
        vm.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
      });
}());

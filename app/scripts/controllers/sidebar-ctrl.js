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
        .controller('SideBarCtrl', function($scope) {
        
        init();
        
        function init() {
            $scope.categories = getCategories();
            $scope.topFive = getTopFive();
        }
        
        function getCategories() {
            return [
                {id: 1, name: 'Bakery'},
                {id: 2, name: 'Lunch'},
                {id: 3, name: 'Coffee'},
                {id: 4, name: 'Dinner'},
                {id: 5, name: 'Night'},
                {id: 6, name: 'Drinks'}
            ];
        }
        
        function getTopFive() {
            return [
                {id: 1, name: 'Location 1'},
                {id: 2, name: 'Location 2'},
                {id: 3, name: 'Location 3'},
                {id: 4, name: 'Location 4'},
                {id: 6, name: 'Location 5'}
            ];
        }
    });
}());
(function(){
    'use strict';

    /**
     * @ngdoc function
     * @name softruckFoursquareApp.routes:MainRoutes
     * @description
     * # MainRoutes
     * The main route of the app
     */
    angular
      .module('softruckFoursquareApp')
      .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
          })
          .otherwise({
            redirectTo: '/'
          });
      });
}());

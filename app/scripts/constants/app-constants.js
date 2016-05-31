(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name softruckFoursquareApp.constantes:AppConstants
   * @description
   * # AppConstants
   * The constants values of the app
   */
  angular
    .module('softruckFoursquareApp')
    .constant('APP_CONSTANTS', {
      FOURSQUARE_SEARCH_URL: 'https://api.foursquare.com/v2/venues/search',
      FOURSQUARE_CLIENT_ID: 'ATO2P421P2MAMIE3HGUG4CLLTOHA10GZM5UXZXDJ5N2GTDQG',
      FOURSQUARE_CLIENT_SECRET: '5K01YYYOMGDLH3C3IMMQSM3TASCWVJHN2IZUOJ2HXBBYKM1O',
      GOOGLE_MAPS_KEY: "AIzaSyAHnukcKfjgitOWN5XFsGchuyJnyT42JiA"
    })
})();

'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('softruckFoursquareApp'));

  var SideBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SideBarCtrl = $controller('SideBarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('categories should have no items to start', function () {
    expect(scope.categories.length).toBe(0);
  });
});

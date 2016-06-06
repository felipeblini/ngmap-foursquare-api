'use strict';

describe('Service: myApp.CategoriesService', function () {

    // load the service's module
    beforeEach(module('myApp'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (_CategoriesService_) {
        service = _CategoriesService_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});

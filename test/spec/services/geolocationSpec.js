describe('Service: myApp.geolocation', function () {

    // load the service's module
    beforeEach(module('myApp'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (_geolocation_) {
        service = _geolocation_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});

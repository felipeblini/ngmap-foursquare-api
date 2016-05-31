describe('Service: myApp.localsFactory', function () {

    // load the service's module
    beforeEach(module('myApp'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (_localsFactory_) {
        service = _localsFactory_;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});

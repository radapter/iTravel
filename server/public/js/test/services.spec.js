'use strict'

// README: wont't work, because  the foursquare API call is made through a backend foursquare proxy
// karma runs a testing server instead of the real node server, so the .explore() call will not return anything
describe("venue servcice tests", function() {
	var Venue, scope;
	beforeEach(module('iTravelApp'));
	beforeEach(inject(function (_Venue_, $rootScope) {
	    Venue = _Venue_;
	    scope = $rootScope.$new();
	  }));

	it('should return venues when explore is called', function(done) {
		Venue.explore({ll:"37.3,-121.88"})
			.then(function(venues){
				expect(venues.length > 0).to.be.true;
				expect(venues[0]).to.be.an.instanceof(Venue);
				expect(venues).to.deep.equal(Venue.data);
				done();	
			});
   	});
});
var expect = require('chai').expect;
var secrets = require('../secrets');

var fourSquare = (require('../utils/fourSquareProxy'))(secrets.fourSquareId, secrets.fourSquareSecret);

// utils/fourSquare.js, core API
describe('utils/fourSquare.js, core API', function(){
  // explore API
  describe('#explore', function(){
    it('should return result of ll:37.3,-121.88 ', function(done){
      fourSquare.explore({"ll":"37.3,-121.88"}, function(error, body){
        expect(error).to.equal(null);
        expect(body).to.be.a('object');
        expect(body.meta.code).to.equal(200);
        expect(body.response.groups[0].items.length > 1).to.equal(true);
        done();
      });
    });

    it('should return result of San Jose', function(done){
      fourSquare.explore({"near":"San Jose, CA"}, function(error, body){
        expect(error).to.equal(null);
        expect(body).to.be.a('object');
        expect(body.meta.code).to.equal(200);
        expect(body.response.groups[0].items.length > 1).to.equal(true);
        done();
      });
    });

  });

  // search API
  describe('#search', function(){
    it('should return result of KFC at Fremont', function(done){
      fourSquare.search({"near":"Fremont, CA", "query":"KFC"}, function(error, body){
        expect(error).to.equal(null);
        expect(body).to.be.a('object');
        expect(body.meta.code).to.equal(200);
        expect(body.response.venues.length > 1);
        expect(body.response.venues[0].name).to.equal("KFC");
        done();
      });
    });

  });
});

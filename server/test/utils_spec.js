var expect = require('chai').expect

var fourSquare = (require('../utils/fourSquare'))("Z4K0IZ0P0UOLQ5DRTP4LLU32TJVTAP50MFKEKXOP5NAPFFEK", "JXZT5MFR54XBZFHLQ440UQGSRVXQNJ42C33QDH1VL2GA0YDD");
// utils/fourSquare.js, core API
describe('utils/fourSquare.js, core API', function(){
  describe('#explore', function(){
    it('should return result of ll:37.3,-121.88 ', function(done){
      fourSquare.explore({"ll":"37.3,-121.88"}, function(error, body){
        expect(body).to.be.a('object');
        expect(body.meta.code).to.equal(200);
        expect(body.response.groups[0].items.length > 1).to.equal(true);
        done();
      });
    });

    it('should return result of San Jose', function(done){
      fourSquare.explore({"near":"San Jose, CA"}, function(error, body){
        expect(body).to.be.a('object');
        expect(body.meta.code).to.equal(200);
        expect(body.response.groups[0].items.length > 1).to.equal(true);
        done();
      });
    });

  });
});

var expect = require('chai').expect;
var fs = require('fs');
var secrets = require('../secrets');

// utils/categoryUtil.js, core API
describe('utils/categoryUtil.js, core API', function(){
  var CategoryUtil = require('../utils/categoryUtil');
  var data = JSON.parse(fs.readFileSync('utils/category.json', 'utf8'));

  describe('#getCategoryHierarchy', function(){
    it('check the list of highest category', function(){
      expect(data.categories.length).to.equal(10);
      expect(data.categories[0].name).to.equal('Arts & Entertainment');
    });

    it('should get hierarchy of Scenic Lookout, as Outdoors & Recreation', function(){
      var cate = new CategoryUtil(data);
      var result = cate.getCategoryHierarchy("4bf58dd8d48988d165941735");
      expect(result[0].name).to.equal('Outdoors & Recreation');
      expect(result[1].name).to.equal('Scenic Lookout');
    });
  });

  describe('#getRootCategory', function(){
    it('should get hierarchy of Scenic Lookout, as Outdoors & Recreation', function(){
      var cate = new CategoryUtil(data);
      var result = cate.getRootCategory("4bf58dd8d48988d165941735");
      expect(result.name).to.equal('Outdoors & Recreation');
    });
  });
});

var fourSquare = (require('../utils/fourSquareProxy'))(secrets.fourSquareId, secrets.fourSquareSecret);
// utils/fourSquareProxy.js, core API
describe('utils/fourSquareProxy.js, core API', function(){
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

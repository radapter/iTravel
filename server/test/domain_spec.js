var expect = require('chai').expect

var Query = require('../domain/query');
var fs = require('fs');

describe('domain/query.js testing', function(){
  var exploreResult = JSON.parse(fs.readFileSync('test/input/exploreSample.json', 'utf8'));

  describe('#construct by explore result', function(){
    var query = new Query(exploreResult);

    it('should get a list of names ', function(){
      var names = query.getNames();
      expect(names.length).to.equal(30);
      expect(names[0]).to.equal('Twin Peaks Summit');
    });

    it('should get a list of venues ', function(){
      var venues = query.getVenues();
      expect(venues[0].id).to.equal('4c29567f9fb5d13aa2139b57');
    });


  });
});

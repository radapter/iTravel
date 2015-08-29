'use strict';

var expect = require('chai').expect;
var Query = require('../domain/venueQuery');
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

  var searchResult = JSON.parse(fs.readFileSync('test/input/searchSample.json', 'utf8'));

  describe('#construct by search result', function(){
    var query = new Query(searchResult);

    it('should get a list of names ', function(){
      var names = query.getNames();
      expect(names.length).to.equal(30);
      expect(names[0]).to.equal('BXL Zoute');
    });
  });

  describe('#add category Hierarchy', function(){
    var query1 = new Query(exploreResult);
    var query2 = new Query(exploreResult);
    it('should have Hierarcky on venue categories', function(){
      var venues1 = query1.getVenues();
      var venues2 = query2.getVenues();
      query2.addCategoryHierarchy();//This will turn venues2 to Hierarchy Categories
      for(var i=0; i<venues1.length; i++){
        expect(venues1[i].categories.length).to.be.below(venues2[i].categories.length);
      }
    });
  });

});

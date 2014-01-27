var should = require('chai').should()
  , redis = require('redis')
  , client = redis.createClient()
  , yeast = require('../models/yeast')(client)
  , hop = require('../models/hop')(client)
  , malt = require('../models/malt')(client);

describe("hop", function() {
    it("should inherit from ingredient", function() {
        hop.should.be.an('object');        
        hop.should.have.a.property('redis');
        hop.should.have.a.property('collection');
        hop.should.have.a.property('api_key');
        hop.should.have.a.property('api_base');
    });
    describe(".get", function() {
      it("should return information about a type of hop", function() {
        hop.get(4, function(err, result) {
          should.not.exist(err);
          result.should.an("string");
          var object = JSON.parse(result);
          object.id.should.equal(4);
          object.name.should.equal('Amarillo');
        });
      });
    });
    describe(".all", function() {
      it("should return a list of the different types of hops", function() {
        hop.all(function(err, results) {
          should.not.exist(err);
          //var data = JSON.parse(results);
          results.should.be.an("object");
          results.should.have.property('27');
          results.should.not.have.property(1553);
          results.should.not.have.property(202);
          results[27].should.equal('Citra');
        });
      });
    });
});

describe("yeast", function() {
    it("should inherit from ingredient", function() {
        yeast.should.be.an('object');
        yeast.should.have.a.property('redis');
        yeast.should.have.a.property('collection');
    });
});

describe("malt", function() {
    it("should inherit from ingredient", function() {
        malt.should.be.an("object");
        malt.should.have.a.property('redis');
        malt.should.have.a.property('collection');
    });
});
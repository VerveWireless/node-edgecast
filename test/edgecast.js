var should = require('should'),
    edgecast = require('../lib/');

describe('index.js', function() {
    var signature = {
          token: "yourtoken",
          account: "youraccount"
        },
        baseMediaPath = "http://yourbaseurl.com",
        MediaType = 8,
        MediaPath = "/some/path/inthe/cdn.jpg",
        PurgeId;

    edgecast.sign(signature);

    describe('#CacheManagement', function() {
      var cm = edgecast.CacheManagement;

      it ('setBaseMediaPath', function (done) {
        cm.setBaseMediaPath(baseMediaPath);
        should.exist(cm.baseMediaPath);
        done();
      });

      it ('purge request', function(done) {
        cm.purge({
          MediaPath: MediaPath,
          MediaType: MediaType
        }, function (err, data, req, res) {
          should.not.exist(err);
          should.exist(data.Id);
          PurgeId = data.Id
          done();
        });
      });

      it ('purge lookup', function(done) {
        should.exist(PurgeId);
        cm.purge(PurgeId, function (err, data, req, res) {
          should.not.exist(err);
          should.exist(data);
          data.Id.should.equal(PurgeId);
          done();
        });
      });

      it ('load', function(done) {
        cm.load({
          MediaPath: MediaPath,
          MediaType: MediaType
        }, function (err, data, req, res) {
          should.not.exist(err);
          should.exist(data);
          done();
        });
      });
    });
});
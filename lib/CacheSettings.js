var client  = require('./client'),
    _       = require('underscore');

module.exports = {

  baseUrl: "/{account}/{method}",
    options: {
    type: 'mcc'
  },

  call: function (method, data, cb) {
    if (typeof data === "function") {
      var cb = data;
      data = null;
    }
    client.get(this.baseUrl, _.extend(this.options, {
      method: method
    }), data, cb);
  },

  compression: function(MediaTypeID, cb) {
    var urlParam = "";
    var data = null;

    if (!isNaN(MediaTypeID)) {
      var data = { mediatypeid: MediaTypeID };
    } else if (typeof MediaTypeID === "function") {
      var cb = MediaTypeID;
    }
    this.call('compression', data, cb);
  },

  querystringcaching: function(MediaTypeID, cb) {
    var data = null;

    if (!isNaN(MediaTypeID)) {
      var data = { mediatypeid: MediaTypeID };
    } else if (typeof MediaTypeID === "function") {
      var cb = MediaTypeID;
    }
    this.call('querystringcaching', data, cb);
  },

  querystringlogging: function(MediaTypeID, cb) {
    var data = null;

    if (!isNaN(MediaTypeID)) {
      var data = { mediatypeid: MediaTypeID };
    } else if (typeof MediaTypeID === "function") {
      var cb = MediaTypeID;
    }

    this.call('querystringlogging', data, cb);
  }
};
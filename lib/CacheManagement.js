var client  = require('./client'),
  _         = require('underscore'),
  assert    = require('assert-plus');

module.exports = {

  baseMediaPath: "",
  baseUrl: "/{account}/edge/{method}",
  options: {
    type: 'mcc'
  },

  setBaseMediaPath: function (baseURL) {
    this.baseMediaPath = baseURL;
    return this;
  },

  get: function (method, data, cb) {
    if (typeof data === "function") {
      var cb = data;
      data = null;
    }
    client.get(this.baseUrl, _.extend(this.options, {
      method: method
    }), data, cb);
  },

  put: function (method, data, cb) {
    if (typeof data === "function") {
      var cb = data;
      data = null;
    }
    client.put(this.baseUrl, _.extend(this.options, {
      method: method
    }), data, cb);
  },

  purge: function(params, cb) {
    if (typeof params === "string") {
      this.get("purge/" + params, cb);
    } else if (typeof params === "object") {
      assert.string(params.MediaPath, "params.MediaPath");
      assert.number(params.MediaType, "params.MediaType");
      if (this.baseMediaPath.length > 0 && this.baseMediaPath.indexOf('http') !== -1) {
        params.MediaPath = this.baseMediaPath + params.MediaPath;
      }
      this.put("purge", params, cb);
    }
    return this;
  },

  load: function(params, cb) {
    if (typeof params === "object") {
      assert.string(params.MediaPath, "params.MediaPath");
      assert.number(params.MediaType, "params.MediaType");
      if (this.baseMediaPath.length > 0 && this.baseMediaPath.indexOf('http') !== -1) {
        params.MediaPath = this.baseMediaPath + params.MediaPath;
      }
      this.put("load", params, cb);
    }
    return this;
  }
};
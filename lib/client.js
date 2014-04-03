var restify         = require('restify'),
  stringFormat      = require('string-format'),
  assert            = require('assert-plus'),
  _                 = require('underscore'),
  querystring       = require('querystring'),
  apiBaseUrl        = 'https://api.edgecast.com',
  client            = module.exports = {
                      signed: false,
                      options: {}
                    };

client.sign = function (options) {

  assert.string(options.token, "Edgecast API Token");

  //close connection after each request, unless specified otherwise
  if (typeof options.agent === 'undefined') {
    options.agent = false;
  }

  //sign
  options.headers = {
    'Authorization': 'TOK:' + options.token
  };

  if (!options.url) {
    options.url = apiBaseUrl;
  }

  if (!options.accept) {
    options.accept = 'application/json';
  }

  if (!options.version) {
    options.version = 'v2';
  }

  if (!options.mediaTypes) {
    options.mediaTypes = [];
  }

  this.JSONClient = restify.createJSONClient(options);
  this.options = options;
  this.baseUrl = '/{version}/{type}/customers';
  this.signed = true;
  return this;
};

client.generateUrl = function (method, params) {
  var options = _.extend(this.options, params);
  var baseUrl = params.baseUrl || this.baseUrl;

  var url = baseUrl + method;
  var formatted = url.format(options);
  return formatted;
};

client.get = function (method, params, data, cb) {
  assert.equal(true, this.signed, 'API is not signed');

  var qs = "";
  if (typeof data === "function") {
    var cb = data;
  } else {
    if (data) {
      var qs = "?" + querystring.stringify(data);
    }
  }

  this.JSONClient.get(this.generateUrl(method + qs, params), function (err, req, res, data) {
    cb(err, data, req, res);
  });
};

client.put = function (method, params, data, cb) {
  assert.equal(true, this.signed, 'API is not signed');
  this.JSONClient.put(this.generateUrl(method, params), data, function (err, req, res, data) {
    cb(err, data, req, res);
  });
};

client.post = function (url, params, cb) {
  this.JSONClient.post(url, params, function (err, req, res, data) {
    cb(err, data, {req: req, res: res });
  });
};

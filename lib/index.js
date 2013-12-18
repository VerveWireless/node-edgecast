var edgecastAPIClient = module.exports = {};

edgecastAPIClient.sign = function (options) {
  this.client = require('./client').sign(options);
  return this;
};

edgecastAPIClient.CacheManagement = require('./CacheManagement');
edgecastAPIClient.CacheSettings = require('./CacheSettings');

/* TODO
All under MediaManagement?!
MediaManagement:
  CustomerOrigins
  EdgeCNAMES
  EdgeNodes? kinda small? Merge into one?
  FlashMedia
  HTTPLiveStreaming
  Log
  SmoothStreaming
  TokenAuth

Reporting:
  BillingRegions
  CustomerAccounts
  ReportCodes
  Core
  Custom
  AdvancedAnalytics?

RealtimeStatistics


 */

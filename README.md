#Edgecast JSON API Client in NodeJS
Simple JSON Client built from Restify's JSONClient library. Specifically designed to set some simple defaults like token/account to reduce redundant signing header code and setting a base media path to use throughout your app.

##Installation

```sh
npm install edgecast
```

##Usage

To get your token and account number you will need access to http://my.edgecast.com. Token can be found under My Settings in the upper right corner and your account number is right underneath that by your account name.

Note: You can pass a wildcard in MediaPath if you want to clear whole directories like /media/1234/* if you have a directory structure to maintain things.

###CacheManagement

```js
//see Usage to find token/account to sign
var edgecast = require ('edgecast').sign({
  token: 'supersecretclienttoken',
  account: '4characcountname'
});

//and use elsewhere like
var cm = require('edgecast').CacheManagement.setBaseMediaPath("http://prepended.domainpath.com");

cm.purge({
  MediaPath: "/some/path/tosomething/inthe/cdn.jpg",
  MediaType: 8
}, function (err, data) {
  if (!err) console.log(data);
});

//data will be {Id: 'some24charactersidnumber'}
```

And with request Id you can pull data about it like so...

```js
cm.purge("some24charactersidnumber", function (err, data) {
  if (!err) console.log(data);
});

/*
{ AccountNumber: '4characcountname',
  CompleteDate: '2013-12-17 21:43',
  Id: 'some24charactersidnumber',
  InDate: '2013-12-17 21:42',
  MediaPath: 'http://prepended.domainpath.com/some/path/tosomething/inthe/cdn.jpg',
  MediaTypeId: 8
}
*/
```

And to force the CDN to load content

```js
cm.load({
  MediaPath: "/some/path/tosomething/notinthe/cdn.jpg",
  MediaType: 8
}, function (err, data) {
  if (!err) console.log(data);
});

//data will be an empty object
```

Each callback can have req, res as extra parameters if you need the full request and response objects to sift through.

####Reference

From the Edgecast docs for ints to pass for MediaType:
2: Flash Media Streaming
3: HTTP Large
8: HTTP Small
14: Application Delivery Network (ADN)

####API

All methods return this in case you want to chain them in one call.

CacheManagement.setBaseMediaPath(string);

CacheManagement.purge({MediaPath: string, MediaType: number}, callback(err, data, req, res));

CacheManagement.purge(string, callback(err, data, req, res)); //read with 24 char Id number

CacheManagement.load({MediaPath: string, MediaType: number}, callback(err, data, req, res));


##Resources##

API Documentaiton (HTML): https://my.edgecast.com/uploads/ubers/1/docs/en-US/webhelp/b/RESTAPIHelpCenter/default.htm

API Documentation (PDF): https://my.edgecast.com/uploads/ubers/1/docs/en-US/Resources/b/EdgeCast_Web_Services_REST_API.pdf

#Todo
CacheManagement is full featured and CacheSettings has been started, so there are lots more to add.

Write some tests.
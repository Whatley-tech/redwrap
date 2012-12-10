/*====================================
=            Requester.js            =
====================================*/

/*==========  MODULES  ==========*/

var request = require('request')
,	EventEmitter = require('events').EventEmitter
,	util = require('util')
,	qs = require('querystring')
,	url = require('url');

/*==========  UTILITY FUNCTIONS  ==========*/

var parseJSON = function(myJSON, cb){
	var parsed = JSON.parse(myJSON);
	cb(parsed);
};

/*==========  CONSTRUCTOR  ==========*/

var Requester = function(path) {
		this.ee = new EventEmitter();
		this.filter = '';
		this.url = {
			protocol: 'http'
		,	host: 'www.reddit.com'
		,	pathname : path + this.filter + '/.json'
		,	query: {}
		};
	};


/*========== @QUERY OPTIONS  ==========*/

//adds a sort filter for USER QUERY ONLY, r QUERIES should use chaining filters to sort
Requester.prototype.sortBy = function(option, cb){
	this.url.query.sort = option;
	return (cb) ? this.exe(cb) : this;
};

//adds a time filter to query
Requester.prototype.from = function(time, cb){
	this.url.query.t = time;
	return (cb) ? this.exe(cb) : this;
};

//adds a limit filter to query
Requester.prototype.limit = function(limit, cb){
	this.url.query.limit = limit;
	return (cb) ? this.exe(cb) : this;
};

//adds an after filter to query
Requester.prototype.after = function(after, cb){
	this.url.query.after = after;
	return (cb) ? this.exe(cb) : this;
};

//adds a before filter to query
Requester.prototype.before = function(before, cb){
	this.url.query.before = before;
	return (cb) ? this.exe(cb) : this;
};

//adds a count filter to query
Requester.prototype.count = function(count, cb){
	this.url.query.count = count;
	return (cb) ? this.exe(cb) : this;
};

/*========== @REQUEST EXECUTION METHODS  ==========*/

//executes a single request
Requester.prototype.exe = function(cb) {
	var query = qs.stringify(this.url.query)
	,	reqUrl = url.format(this.url);

		request(reqUrl, cb);
		console.log('Requested URL: ' + reqUrl);
};

//executes multiple requests
Requester.prototype.all = function(cb) {
		cb(this.ee);
		this.url.query.limit = 100; //force max limit for bulk requests
		this.collector();
};

/*
	collector calls itself recursivly to make multiple requests when
	it becomes actiavted by the .all() method. It emits a data event
	each time a request completes and passes the response data to the event
	listener.

 */

Requester.prototype.collector = function() {
	var that = this;
	var reqUrl = url.format(that.url);
	
	console.log('Requested: ' + reqUrl);

	request(reqUrl, function(error, res, body){
		if (error) {
			return that.ee.emit('error', error);
		}
		if (!error && res.statusCode == 200) {
			that.ee.emit('data', body);

			parseJSON(body, function(bodyObj){
				
				if(bodyObj.data.after) {
					var nextAfter = bodyObj.data.after,
						prevAfter = that.url.query.after;
						that.url.query.count += 100;
						that.url.query.after = nextAfter;

						return (nextAfter !== prevAfter) ?
							that.collector() : that.ee.emit('end', 'Done');
				}
			});
		}
	});
};

/*==========  CHAINING FILTERS  ==========*/

var filters = [
	//user
	'overview'
	,'comments'
	,'submitted'
	,'liked'
	,'disliked'
	,'hidden'
	,'saved'
	,'about'
	//r
	,'hot'
	,'new'
	,'controversial'
	,'top'
	];

filters.forEach(function(filter) {
	Requester.prototype[filter] = function(cb) {
		if(this.filter) throw "Only one filter can be applied to a query.";
		this.filter = filter;
		if(cb) {
			this.exe(cb);
		}
		return this;
	};
});

/*==========  EXPORTS  ==========*/

exports.Requester = Requester;


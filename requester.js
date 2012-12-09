/*====================================
=            Requester.js            =
====================================*/

/*==========  MODULES  ==========*/

var request = require('request')
,	EventEmitter = require('events').EventEmitter
,	util = require('util')
,	qs = require('querystring');

/*==========  UTILITY FUNCTIONS  ==========*/

var parseJSON = function(myJSON, cb){
	var parsed = JSON.parse(myJSON);
	cb(parsed);
};

/*==========  CONSTRUCTOR  ==========*/

var Requester = function(path) {
		this.path = path;
		this.filter = '';
		this.query = '';
		this.ee = new EventEmitter();
	};

/*==========  QUERY OPTIONS  ==========*/

//adds a sort query to the request
Requester.prototype.from = function(sortOption,cb){
	this.query += (this.query) ? '&t=' + sortOption : '?t=' +  sortOption;
	return (cb) ? this.exe(cb) : this;
};

//adds a limit query to the request
Requester.prototype.limit = function(limit, cb){
	this.query += (this.query) ? '&limit=' + limit  : '?limit=' +  limit;
	return (cb) ? this.exe(cb) : this;
};

/*==========  REQUEST EXECUTION METHODS  ==========*/

//executes a single request
Requester.prototype.exe = function(cb) {
	var url = this.path + '/' + this.filter + '/' + '.json' + this.query;
		request(url, cb);
		console.log('Requested URL: ' + url);
};

//executes multiple requests
Requester.prototype.all = function(cb) {
	var url = this.path + '/' + this.filter + '/' + '.json' + this.query
	,	incrament = '';
		
		cb(this.ee);
		this.collector();
};

//collector is used by the .all() method to make multipe requests
Requester.prototype.collector = function(nextQuery, currentCount, lastPost) {
	var that = this;

	var initUrl = this.path + '/' + this.filter + '/' + '.json'
	,	url = (nextQuery) ? initUrl + nextQuery : initUrl
	,	iteration = currentCount || 0;

	request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				
				that.ee.emit('data', body);
				
				parseJSON(body, function(bodyObj) {
					iteration += 25;
	
					if(bodyObj.data.after) {
						var post = bodyObj.data.after
						,	nextQuery = '?count=' + iteration + '&after=' + post
						,	urlObj = qs.parse(url);

						console.log('Next Url: ' + initUrl + nextQuery);

						if(urlObj.after !== post) {
							that.collector(nextQuery, iteration, post);
							return;
						}
						that.ee.emit('end', 'Query complete'); //TODO: make this work
					}
				});
			}
			that.ee.emit('error', error);
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


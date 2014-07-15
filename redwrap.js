Requester = require('./requester').Requester;

//request user data
var user = function(username, cb, query) {
		var path = '/user/' + username + '/',
			requester = new Requester(path, query);

		return(cb) ? requester.exe(cb) : requester;
	};

//request subreddit data
var r = function(subreddit, cb, query) {
		var path = '/r/' + subreddit + '/',
			requester = new Requester(path, query);

		return(cb) ? requester.exe(cb) : requester;
	};

//lists reddit front page filters
var list = function(filter, cb, query) {
		var path = '',
			requester = '';

		if(filter) {
			path = filter + '/', requester = new Requester(path, query);
		} else {
			requester = new Requester(null, query);
		}

		return(cb) ? requester.exe(cb) : requester;
	};

exports.user = user;
exports.r = r;
exports.list = list;
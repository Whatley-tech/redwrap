Requester = require('./requester').Requester;

//request user data
var user = function(username, cb) {
		var path = 'http://www.reddit.com/user/' + username,
			requester = new Requester(path);

		return(cb) ? requester.exe(cb) : requester;
	};

//request subreddit data
var r = function(subreddit, cb) {
		var path = 'http://www.reddit.com/r/' + subreddit,
			requester = new Requester(path);

		return(cb) ? requester.exe(cb) : requester;
	};

//lists reddit front page filters
var list = function(filter, cb) {

		var hasFilter = 'http://www.reddit.com' + '/' +  filter
		,	noFilter = 'http://www.reddit.com'
		,	path = (filter) ? hasFilter : noFilter
		,	requester = new Requester(path);

		return(cb) ? requester.exe(cb) : requester;
	};

exports.user = user;
exports.r = r;
exports.list = list;
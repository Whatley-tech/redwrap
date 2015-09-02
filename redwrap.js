var Requester = require('./requester').Requester;

var userAgent = "redwrap";

var setUserAgent = function(name){
  userAgent = name;
};

//request user data
var user = function(username, cb) {
  var path = '/user/' + username + '/',
    requester = new Requester(path);

  requester.setUserAgent(userAgent);

  return (cb) ? requester.exe(cb) : requester;
};

//request subreddit data
var r = function(subreddit, cb) {
  var path = '/r/' + subreddit + '/',
    requester = new Requester(path);

  requester.setUserAgent(userAgent);

  return (cb) ? requester.exe(cb) : requester;
};

//lists reddit front page filters
var list = function(filter, cb) {
  var path = '',
    requester = '';

  if(filter) {
    path = filter + '/';
    requester = new Requester(path);
  } else {
    requester = new Requester(null);
  }

  requester.setUserAgent(userAgent);

  return (cb) ? requester.exe(cb) : requester;
};

exports.setUserAgent = setUserAgent;
exports.user = user;
exports.r = r;
exports.list = list;

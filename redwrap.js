var Requester = require('./requester').Requester;

var redwrap = {};

redwrap.options = {};

redwrap.setUserAgent = function(userAgent){
  redwrap.options.userAgent = userAgent;
  return redwrap;
};

redwrap.setQuery = function(query){
  redwrap.options.query = query;
  return redwrap;
};

redwrap.setOptions = function(opts){
  Object.keys(opts).forEach(function(key){
    redwrap.options[key] = opts[key];
  });
  return redwrap;
};

//request user data
redwrap.user = function(username, cb) {
  var path = '/user/' + username + '/',
    requester = new Requester(path, redwrap.options);

  return (cb) ? requester.exe(cb) : requester;
};

//request subreddit data
redwrap.r = function(subreddit, cb) {
  var path = '/r/' + subreddit + '/',
    requester = new Requester(path, redwrap.options);

  return (cb) ? requester.exe(cb) : requester;
};

//lists reddit front page filters
redwrap.list = function(filter, cb) {
  var path = '',
    requester = '';

  if(filter) {
    path = filter + '/';
    requester = new Requester(path, redwrap.options);
  } else {
    requester = new Requester(null, redwrap.options);
  }

  return (cb) ? requester.exe(cb) : requester;
};

exports = redwrap;

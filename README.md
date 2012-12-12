#redwrap

##Description

Redwrap is a node.js module that simplifies Reddit API requests through jquery style chaining methods.  

##How to use

Start by requiring the redwrap module

```javascript
reddit = require('redwrap');
```

This gives us access to 3 types of requests. 

###1.The basic user request

Redwrap uses the request module to issue requests behind the scenes.  If you are familiar with request, you will notice the arguments for our callbacks in redwrap are the same as request.

```javascript
reddit.user('username', function(err, res, body){
  console.log(body); //outputs json for the requested username
});
```

###2.The basic subreddit request
###3.The basic list request


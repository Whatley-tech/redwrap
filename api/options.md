### redwrap.options

This is the options object used when initializing requests. Keys are shown below

 - `.debug` - Whether or not to log to the console. Defaults to `false`
 - `.userAgent` - The user agent to use in requests. Defaults to `redwrap`
 - `.query` - The query object for the request. Defaults to `{}`

 **Chainable Methods**

 There are a few chainable methods used to modify the options of requests

 - `.setOptions(opts)` - Properties in `opts` override those in `redwrap.options`
 - `.setUserAgent(userAgent)` - Changes the `userAgent` property
 - `.setQuery(query)` - Changed the `query` property

 These can also be executed after requests are made

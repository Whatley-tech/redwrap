### redwrap.options

This is the options object used when initializing requests. Keys are shown below

 - `.debug` - Whether or not to log to the console. Defaults to `false`
 - `.userAgent` - The user agent to use in requests. Defaults to `redwrap`

 **Chainable Methods**

 There are a few chainable methods used to modify the options before requests are made

 - `redwrap.setOptions(opts)` - Properties in `opts` override those in `redwrap.options`
 - `redwrap.setUserAgent(userAgent)` - Changes the `userAgent` property

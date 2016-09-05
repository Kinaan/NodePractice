var http = require('http'),
	liburl  = require('url'),
	utilities = require('./utilities')

// simple, async, promise or stream
var implementation_type = process.argv[2] || 'simple'
var Implementation = require('./' + implementation_type + '-implementation')

http.createServer(function(req,res){
	var url = liburl.parse(req.url, true)

	if ( /\/I\/want\/title\/?$/.test(url.pathname) ){
		
		var urls_to_fetch = url['query'] && url['query']['address']
		if ( !urls_to_fetch ) return utilities.render404(res)

		if ( typeof urls_to_fetch == 'string' )  
			urls_to_fetch = new Array(urls_to_fetch)

		res.writeHead(200,{'Content-Type': 'text/html'})
		new Implementation(req,res).handleTitleRoute(urls_to_fetch,function(){
			res.end()
		})
	}
	else{
		utilities.render404(res)		
	}	
	
})
	.listen(3000)

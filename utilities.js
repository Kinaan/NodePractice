var request   = require('request'),
	cheerio = require('cheerio');
	
exports.getUrlTitlePair = function(url,callback){
	var final_url = /^https?:\/\//.test(url) ? url : 'http://' + url
	request.get({uri: final_url, followRedirect: true, gzip: true },function(err, response, body) {
		if (err) return callback(null, [url,'NO RESPONSE'])
		
		var title = ''	
		if ( response.statusCode == 200 ) title = cheerio.load(body)('title').html()	
	  callback(null, [url,'"' + title + '"'])
	})
}


exports.render404 = function(res){
	res.writeHead(404,{'Content-Type': 'text/html'})
	res.end('Page Not Found')
}
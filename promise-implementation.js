var utilities = require('./utilities'),
	view = require('./html-view'),
	RSVP = require('rsvp');

module.exports = function(req,res){
	return {
		handleTitleRoute: function(urls, completionHandler){
			res.write(view.generateContainerHeader())

			var promises = urls.map(function(url){ return promiseForUrlTitlePair(url) })			
			RSVP.all(promises).then(function(url_title_pairs){
				res.write(view.generateContainerFooter())
				completionHandler()
			}).catch(function(err){
				res.writeHead(500,{'Content-Type': 'text/html'})
				res.end('Internal Server Error.')
			})

		}
	}

	function promiseForUrlTitlePair(url){
		var promise = new RSVP.Promise(function(resolve, reject) {
	  	utilities.getUrlTitlePair(url,function(err,url_title_pair){
	  		res.write(view.generateLiForTitle(url_title_pair))
	  		resolve(url_title_pair)
	  	})
		})
		return promise;
	}
}
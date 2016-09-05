var view = require('./html-view')
	utilities = require('./utilities')

module.exports = function(req,res){
	return {
		handleTitleRoute: function(urls, completionHandler){
			// it hasn't been explicitly mentioned in requirements, if we want to maintain an order while printing the list
			var url_title_pairs = [], urls_fetched = 0, total_urls = urls.length

			res.write(view.generateContainerHeader())
			urls.forEach(function(url,index){
				utilities.getUrlTitlePair(url,function(err, url_title_pair){
					res.write(view.generateLiForTitle(url_title_pair))
					urls_fetched++
					if ( urls_fetched == total_urls ){ 
						res.write(view.generateContainerFooter())
						completionHandler()
					}
				})
			})

		}
	}
}
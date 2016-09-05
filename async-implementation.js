var utilities = require('./utilities'),
	view = require('./html-view'),
	async = require('async')

module.exports = function(req,res){
	return {
		handleTitleRoute: function(urls, completionHandler){
			async.map(urls,function(url, callback){
				utilities.getUrlTitlePair(url, callback)
			},function(err, url_title_pairs){
				res.write(view.generateHtmlForTitles(url_title_pairs))
				completionHandler()
			})
		}
	}
}
var view = require('./html-view')
	utilities = require('./utilities'),
	bacon = require('baconjs')

module.exports = function(req,res){
	return {
		handleTitleRoute: function(urls,completionHandler){
			var streams = urls.map(function(url){ return bacon.fromNodeCallback(utilities.getUrlTitlePair,url) })
			var stream = bacon.mergeAll(streams)

			res.write(view.generateContainerHeader())
			stream.onValue(function(url_title_pair){ res.write(view.generateLiForTitle(url_title_pair)) })
			stream.onEnd(function(){ 
				res.write(view.generateContainerFooter()) 
				completionHandler()
			})
		}
	}
}
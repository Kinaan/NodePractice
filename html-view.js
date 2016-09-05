
exports.generateHtmlForTitles 	= generateHtmlForTitles
exports.generateLiForTitle 			= generateLiForTitle
exports.generateContainerHeader = generateContainerHeader
exports.generateContainerFooter = generateContainerFooter

function generateHtmlForTitles(url_title_pairs){
	var html = generateContainerHeader()
	for ( var i = 0 ; i < url_title_pairs.length ; ++i){
		html += generateLiForTitle(url_title_pairs[i])
	}
  html += generateContainerFooter();
  return html;
}

function generateLiForTitle(url_title_pair){
	var url = url_title_pair[0], title = url_title_pair[1];
	return '<li> ' + url + ' - ' + title + ' </li>' 
}

function generateContainerHeader(){
	return '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>';
}

function generateContainerFooter(){
	return '</ul></body></html>' 
}
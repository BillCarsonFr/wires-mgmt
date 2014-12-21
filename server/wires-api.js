var config = require('../config');

var wireBaseDir = config.wiresPath;//"./wires"
var fs = require('fs');

var xpath = require('xpath'), dom = require('xmldom').DOMParser;

exports.wires = function (req, res) {
	
	var fileNames = [], screens = [];
	fileNames = fs.readdirSync(wireBaseDir);
	fileNames.forEach(function (name, i) {
		var index = name.indexOf('.bmml')
		if(index != -1){
			screens.push(name.substring(0,index));
		}
  	});
	res.json({
		screens: screens
	});
}

exports.wire = function(req, res) {

	try {
		var name = req.params.id
		var xml = fs.readFileSync(config.wiresPath  +'/' + name +'.bmml', {encoding :'utf8'});
		var doc = new dom().parseFromString(xml);
		var nodes = xpath.select("//control[@controlTypeID='com.balsamiq.mockups::StickyNote']", doc);
		var wireInfo = { status : 'In Progress', comments : [] , screenShot : 'media/' + name + '.png'};
			
		for (var i = 0; i < nodes.length; i++) {
			var n = nodes[i];
			content = getMarkupText(n);
			if(isSOWTMarkup(content)) {

				var lines = content.split('\n');
				for (var j = 1; j < lines.length; j++) {
					if(lines[j].indexOf('STATUS') != -1){
						wireInfo.status = lines[j].split(':')[1].trim();
					} else {
						var comment = parseComment(lines[j]);
						if(comment) {
							wireInfo.comments.push(comment);
						}
					}
				}

				break;
			}
		};

		res.send(wireInfo);

	} catch(e) {
		res.status(404);
		res.send(e);
	}

} 

function getMarkupText(domNode) {
	return decodeURIComponent(xpath.select("controlProperties/text/text()",domNode)[0].data);
}

function isSOWTMarkup(content) {
	return	content.indexOf('##SOWT##') == 0;
}

function parseComment(line) {
	if(line.indexOf(':') !=1){
		var comment = {};
		var parts = line.split(':');
		if(parts.length == 2) {
			comment.author = parts[0];
			if(parts[1].indexOf(',') != -1) {
				var nf = parts[1].split(',');
				comment.description = nf[0];
				if(nf[1].trim() == '[x]'){
					comment.closed = false;
				} else {
					comment.closed = true;
				}
			} else {
				comment.description = parts[1];
			}
			return comment;
		} else {
			//console.log('cannot parseComment ' + line);
		}
	}
}
  
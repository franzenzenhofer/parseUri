// a node.js module fork of
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// see: http://blog.stevenlevithan.com/archives/parseuri
// see: http://stevenlevithan.com/demo/parseuri/js/

//forked into a node.js module by franz enzenhofer 
 

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	//	When host and source match, it means that we have no host and the path is relative.
	if(uri['host'] == uri['source']) {
		uri['host'] = '';
		uri['relative'] = '/' + uri['source'];
	}

	//	When host is "." or "..", it again means that we have no host and the path is relative.
	var host = uri['host'];
	if(host == '.'
		|| host == '..') {
		uri['host'] = '';
	}

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

module.exports = parseUri
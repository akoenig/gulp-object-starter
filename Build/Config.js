var config = {
	// Empty tasks array which will be filled with the aviable taskNames on each gulp run.
	'tasks': [],

	'paths': {
		'packages': 'Web/typo3conf/ext/',
		'private': 'Resources/Private/',
		'public': 'Resources/Public/',
		'docs': 'Documentation/'
	},

	'project': {
		'isInLiveMode': false,
		'browserSupport': ['last 2 versions', 'ie 9']
	},

	// Configuration rules for http://jscs.info/
	'jscs': {
		'esnext': true,
		'preset': 'google',
		'validateIndentation': null
	},

	// Configuration for https://github.com/doctyper/gulp-modernizr
	'modernizr': {
		'fileName': 'Modernizr.js',
		'destPath': 'Web/Modernizr/',
		'config': {
			// Based on default settings on http://modernizr.com/download/
			'options': [
				'setClasses',
				'addTest',
				'html5printshiv',
				'testProp',
				'fnBind'
			]
		}
	}
};

module.exports = config;

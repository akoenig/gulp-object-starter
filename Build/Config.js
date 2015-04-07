var config = {
	// Empty tasks array which will be filled with the aviable taskNames on each gulp run.
	'tasks': [],

	// A collection of the structure paths, can be used to quickly adjust the project structure.
	'paths': {
		'packages': 'Web/typo3conf/ext/',
		'private': 'Resources/Private/', // Will be based on the packages path above.
		'public': 'Resources/Public/', // Will be based on the packages path above.
		'docs': 'Documentation/'
	},

	// Project related settings, switching the 'isInLiveMode' bool to true, minifies the assets in each build task.
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

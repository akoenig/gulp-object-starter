var gulp = require('gulp');
var _ = require('lodash');
var hasObjectRequiredKeys = require('./../Utilities/HasObjectRequiredKeys.js')

var requiredKeys = {
	primaries: ['basePath', 'name'],
	sass: ['src', 'dest'],
	images: ['src', 'dest', 'settings'],
	scripts: ['src', 'dest', 'bundles']
};

var Package = function(options) {
    'use strict';

    var hasPackageOptionsRequiredAttributes = this.hasPackageOptionsRequiredAttributes(options);

    if(hasPackageOptionsRequiredAttributes) {	  	
		this.options = options;

		this.createTasks();
    }

	return options;
};
Package.prototype.hasPackageOptionsRequiredAttributes = function(options) {
    'use strict';

    var hasRequiredAttributes = true;
    var messageSuffix = ' while creating a new Package instance in ./Build/Config.js.';

    if(!options) {
    	throw new Error('Please set an options object' + messageSuffix)
    }

    _.forEach(options, function(value, key) {
    	var isConfigurationObj = _.isObject(value);
    	var testResults;
    	var isConfigurationObjValid = true;

    	if(isConfigurationObj) {
    		testResults = hasObjectRequiredKeys(value, requiredKeys[key]);
    		isConfigurationObjValid = testResults.result
    	}

    	if(!isConfigurationObjValid) {
    		hasRequiredAttributes = false;
    		throw new Error('Option "' + testResults.missingKey + '" was not found in the "' + key + '" object' + messageSuffix);
    	}
    });

    return hasRequiredAttributes;
};

Package.prototype.createTasks = function() {
	'use strict';

	gulp.task('somename', function() {
		// Do stuff
		console.log('yeo');
	});
};

module.exports = Package;

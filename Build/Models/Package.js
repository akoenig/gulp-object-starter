var gulp = require('gulp');
var _ = require('lodash');
var hasObjectRequiredKeys = require('./../Utilities/HasObjectRequiredKeys.js')

var requiredKeys = {
	primaries: ['basePath', 'name'],
	sass: ['src', 'dest', 'filePattern'],
	images: ['src', 'dest', 'filePattern', 'settings'],
	scripts: ['src', 'dest', 'filePattern', 'bundles']
};

var Package = function Package(obj) {
	'use strict';

	var options = obj.options;
	var hasOptionsRequiredAttributes = this.hasOptionsRequiredAttributes(options);

	this.repository = obj.repository;
	this.options = options;

	if(hasOptionsRequiredAttributes) {
		this.createTasks();
	}

	return this;
};
Package.prototype.hasOptionsRequiredAttributes = function(options) {
	'use strict';

	var hasRequiredAttributes = true;
	var messageSuffix = ' while creating a new Package instance in ./Build/Config.js.';

	if(!options) {
		throw new Error('Please set an options object' + messageSuffix)
	}

	_.forEach(options, function(value, key) {
		var isConfigurationObj = _.isObject(value);
		var isConfigurationObjValid = true;
		var testResults;

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

	var tasks = this.repository.getPackageTasks();
	var packageModel = this;

	_.forEach(tasks, function(taskFunction) {
		taskFunction(packageModel);
	});

	return this;
};

module.exports = Package;

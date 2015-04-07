var gulp = require('gulp');
var _ = require('lodash');
var hasObjectRequiredKeys = require('./../Utilities/HasObjectRequiredKeys.js');
var errorMessageSuffix = ' while initiating a new Package, please refer to the example PackageConfig.js.';
var requiredPrimaryKeys = ['basePath', 'name'];

var Package = function Package(obj) {
	'use strict';

	var options = obj.options;

	this.repository = obj.repository;
	this.options = options;

	this.evaluteRequiredPackageKeys();
	this.createTasks();

	return this;
};

Package.prototype.evaluteRequiredPackageKeys = function() {
	'use strict';

	var options = this.options;
	var testResults = hasObjectRequiredKeys(options, requiredPrimaryKeys);
	var hasRequiredAttributes = testResults.result;

	if(!options) {
		throw new Error('Please set an options object' + errorMessageSuffix);
	}

	if(!hasRequiredAttributes) {
		throw new Error('Attribute "' + testResults.missingKey + '" was not found' + errorMessageSuffix);
	}

	return hasRequiredAttributes;
};

Package.prototype.createTasks = function() {
	'use strict';

	var packageModel = this;
	var options = this.options;
	var tasks = this.repository.getPackageTasks();

	// Loop over each registered task.
	_.forEach(tasks, function(taskExport) {
		var hasTaskRequiredKeys = _.isObject(taskExport) && taskExport.requiredKeysObject;
		var taskFunction = taskExport;
		var hasRequiredAttributes = true;

		// If the task itself has a required object structure for the package, evaluate it.
		if(hasTaskRequiredKeys) {
			hasRequiredAttributes = packageModel.evaluteTasksRequiredKeys(taskExport.requiredKeysObject, options);

			// Re-Assign the variable which will be executed if the taskExport is an object.
			taskFunction = taskExport.createTask;
		}

		// If all attributes are present, create the task.
		if(hasRequiredAttributes) {
			taskFunction(packageModel);
		}
	});

	return this;
};

Package.prototype.evaluteTasksRequiredKeys = function evaluteTasksRequiredKeys(tasksRequiredKeysObject, packageOptions) {
	var hasRequiredAttributes = true;

	_.forEach(tasksRequiredKeysObject, function(requiredKeys, targetKey) {
		var testResults = hasObjectRequiredKeys(packageOptions[targetKey], requiredKeys);

		if(!testResults.result && testResults.missingKey && hasRequiredAttributes) {
			hasRequiredAttributes = false;

			throw new Error('Missing attribute "' + testResults.missingKey + '" in object "' + targetKey + '" ' + errorMessageSuffix);
		}
	});

	return hasRequiredAttributes;
};

module.exports = Package;

var requiredKeys = {
	basics: ['basePath'],
	sass: ['src', 'dest'],
	images: ['src', 'dest', 'settings'],
	scripts: ['src', 'dest', 'bundles']
};

var Package = function(options) {
    'use strict';

	// Check for required options before returning the package configuration.
	this.validateKeys(requiredKeys.basics, options);

	// Sass property validation.
	this.validateKeys(requiredKeys.sass, options.sass, 'sass');

	// Images property validation.
	this.validateKeys(requiredKeys.images, options.images, 'scripts');

	// Scripts property validation.
	this.validateKeys(requiredKeys.scripts, options.scripts, 'scripts');

	return options;
};
Package.prototype.validateKeys = function(requiredArray, targetObject, parentAttributeKeyName) {
    'use strict';

	if(!requiredArray || !targetObject) {
		return;
	}

	requiredArray.forEach(function(key) {
		var isKeyNotInOptions = !targetObject[key];

		if(isKeyNotInOptions) {
			throw new Error('Option "' + key + '" was not found ' + ((parentAttributeKeyName) ? ('in the "' + parentAttributeKeyName + '" object ') : '') + 'while creating a new Package instance in the ./Build/Config.js');
		}
	});
};

module.exports = Package;

var _ = require('lodash');
var Packages = require('./Repositories/Packages.js');
var createParentTasks = require('./Utilities/CreateParentTasks.js');
var singleton;

var Build = function() {
	'use strict';

	this.packagesRepository = new Packages();

	this.createPackageBasedTasks();
};

Build.prototype.createPackageBasedTasks = function() {
	'use strict';

	// Setup tasks which are re-created for each package.
	this.packagesRepository.addPackageTask([
		require('./Tasks/Compilers/Sass.js'),
		require('./Tasks/Compilers/Scripts.js'),
		require('./Tasks/Compilers/Images.js'),
		require('./Tasks/Compressors/Scripts.js'),
		require('./Tasks/Compressors/Styles.js')
	]);
};

Build.prototype.addPackages = function(packageConfigs) {
	'use strict';

	_.forEach(packageConfigs, function(packageConfig) {
		this.packagesRepository.addPackage(packageConfig);
	}.bind(this));

	this.createParentTasks();
	this.createAdditionalTasks();
};
Build.prototype.getPackages = function() {
	'use strict';

	return this.packagesRepository.getPackages();
};

Build.prototype.createParentTasks = function() {
	'use strict';

	var tasksArray = require('./Config.js').tasks;

	// Create a task with the second argument, which runs every task which name inherits the second argument as a part of the name. F.e.
	// createParentTasks(tasksArray, 'compile:sass'); -> gulp.task -> ['compile:sass:examplePackage1', 'compile:sass:examplePackage2']
	createParentTasks(tasksArray, 'compile:sass');
	createParentTasks(tasksArray, 'compile:images');
	createParentTasks(tasksArray, 'compile:scripts');

	createParentTasks(tasksArray, 'compress:scripts');
	createParentTasks(tasksArray, 'compress:styles');
};

Build.prototype.createAdditionalTasks = function() {
	'use strict';

	var modernizrTask = require('./Tasks/Compilers/Modernizr.js');
	var buildTask = require('./Tasks/Build.js');
	var compressTask = require('./Tasks/Compress.js');
};

module.exports = function() {
	singleton = singleton || new Build();

	return singleton;
}();

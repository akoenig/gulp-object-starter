var _ = require('lodash');
var Packages = require('./Repositories/Packages.js');
var createParentTasks = require('./Utilities/CreateParentTasks.js');
var singleton;

var Starter = function() {
	'use strict';

	this.packagesRepository = new Packages();

	this.createPackageBasedTasks();
};

Starter.prototype.createPackageBasedTasks = function() {
	'use strict';

	// Setup tasks which are re-created for each package.
	this.packagesRepository.addTask([
		require('./Tasks/Compilers/Sass.js'),
		require('./Tasks/Compilers/Scripts.js'),
		require('./Tasks/Compilers/Images.js')
	]);
};

Starter.prototype.addPackages = function(packageConfigs) {
	'use strict';

	_.forEach(packageConfigs, function(packageConfig) {
		this.packagesRepository.addPackage(packageConfig);
	}.bind(this));

	this.createParentTasks();
};

Starter.prototype.createParentTasks = function() {
	'use strict';

	var tasksArray = require('./Config.js').tasks;

	// Create a task with the second argument, which runs every task which name inherits the second argument as a part of the name. F.e.
	// createParentTasks(tasksArray, 'compile:sass'); -> gulp.task -> ['compile:sass:examplePackage1', 'compile:sass:examplePackage2']
	createParentTasks(tasksArray, 'compile:sass');
	createParentTasks(tasksArray, 'compile:images');
	createParentTasks(tasksArray, 'compile:scripts');
};

module.exports = function() {
	singleton = singleton || new Starter();

	return singleton;
}();

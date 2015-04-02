var _ = require('lodash');
var Packages = require('./Repositories/Packages.js');
var createParentTasks = require('./Utilities/CreateParentTasks.js');
var singleton;

var Build = function Build() {
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
		require('./Tasks/Minifiers/Images.js'),
		require('./Tasks/Minifiers/Scripts.js'),
		require('./Tasks/Minifiers/Styles.js')
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
	createParentTasks(tasksArray, 'compile:scripts');

	createParentTasks(tasksArray, 'minify:images');
	createParentTasks(tasksArray, 'minify:scripts');
	createParentTasks(tasksArray, 'minify:styles');
};

Build.prototype.createAdditionalTasks = function() {
	'use strict';

	require('./Tasks/Compilers/Modernizr.js');
	require('./Tasks/Build.js');
	require('./Tasks/Minify.js');
	require('./Tasks/Lint.js');
	require('./Tasks/Watch.js');
};

module.exports = function() {
	singleton = singleton || new Build();

	return singleton;
}();

var Packages = require('./Repositories/Packages.js');
var createParentTasks = require('./Utilities/CreateParentTasks.js');
var packagesRepository = new Packages();
var tasksArray;

// Setup tasks which are re-created for each package.
packagesRepository.addTask([
	require('./Tasks/Compilers/Sass.js'),
	require('./Tasks/Compilers/Scripts.js'),
	require('./Tasks/Compilers/Images.js')
]);

// Setup the model, which will create it's tasks, based on the .addTask() method above.
packagesRepository.addPackage(require('./../Web/typo3conf/ext/examplePackage/BuildConfig.js'));

// Setup general tasks which aren't depending on a single package.
tasksArray = require('./Config.js').tasks;

// Create a task with the second argument, which runs every task which name inherits the second argument as a part of the name. F.e.
// createParentTasks(tasksArray, 'compile:sass'); -> gulp.task -> ['compile:sass:examplePackage1', 'compile:sass:examplePackage2']
createParentTasks(tasksArray, 'compile:sass');
createParentTasks(tasksArray, 'compile:images');
createParentTasks(tasksArray, 'compile:scripts');

module.exports = packagesRepository;

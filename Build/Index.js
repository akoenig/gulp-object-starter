var Packages = require('./Repositories/Packages.js');
var packagesRepository = new Packages();

packagesRepository.addTask([
	require('./Tasks/Compilers/Sass.js'),
	require('./Tasks/Compilers/Scripts.js'),
	require('./Tasks/Compilers/Images.js')
]);

packagesRepository.addPackage(require('./../Web/typo3conf/ext/examplePackage/BuildConfig.js'));

module.exports = packagesRepository;

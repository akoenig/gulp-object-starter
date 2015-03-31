var build = require('./Build/Index.js');

build.addPackages([
	require('./Web/typo3conf/ext/examplePackage/BuildConfig.js')
]);
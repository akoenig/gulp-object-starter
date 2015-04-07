var build = require('./Build/Index.js');

// Add package configurations. Tasks will be automatically created.
build.addPackages([
	require('./Examples/Packages/ExamplePackage/BuildConfig.js')
]);

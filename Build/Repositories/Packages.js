var Package = require('./../Models/Package.js');

var Packages = function() {
	this.models = [];
};
Packages.prototype.addPackage = function(packageConfig) {
	var newPackage = new Package(packageConfig);

	this.models.push(newPackage);

	return newPackage;
};
Packages.prototype.gePackages = function() {
	return this.models;
};

module.exports = Packages;
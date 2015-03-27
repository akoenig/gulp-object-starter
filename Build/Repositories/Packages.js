var Package = require('./../Models/Package.js');
var _ = require('lodash');

var Packages = function() {
	this.models = [];
	this.tasks = {};
};
Packages.prototype.addPackage = function(packageOptions) {
	var config = _.extend({}, {
		options: packageOptions
	}, {
		repository: this
	});
	var newPackage = new Package(config);

	this.models.push(newPackage);

	return newPackage;
};
Packages.prototype.getPackages = function() {
	return this.models;
};
Packages.prototype.addTask = function(tasks) {
	_.forEach(tasks, function(task, taskKey) {
		this.tasks[taskKey] = task;
	}.bind(this));

	return this;
};
Packages.prototype.getTasks = function() {
	return this.tasks;
};

module.exports = Packages;
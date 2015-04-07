var _ = require('lodash');
var gulp = require('gulp');
var config = require('./../Config.js');

module.exports = function createParentTasks(tasksArray, taskNameToCreate) {
	'use strict';

	var tasksToRun = [];
	var task = null;

	_.forEach(tasksArray, function(taskName) {
		var isTaskNameRelevant = taskName.indexOf(taskNameToCreate) >= 0;

		if(isTaskNameRelevant) {
			tasksToRun.push(taskName);
		}
	});

	if(tasksToRun.length) {
		config.tasks.push(taskNameToCreate);
		task = gulp.task(taskNameToCreate, tasksToRun);
	}

	return task;
};

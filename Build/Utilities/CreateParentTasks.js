var _ = require('lodash');
var gulp = require('gulp');

module.exports = function(tasksArray, taskNameToCreate) {
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
		task = gulp.task(taskNameToCreate, tasksToRun);
	}

	return task;
};
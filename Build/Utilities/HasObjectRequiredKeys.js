var hasObjectRequiredKeys = function(obj, requiredKeysArray) {
	var returnVal = {
		result: true
	};

	if(obj && requiredKeysArray) {
		requiredKeysArray.forEach(function(key) {
			var isKeyInOptions = key in obj;

			if(!isKeyInOptions) {
				returnVal.result = false;
				returnVal.missingKey = key;
			}
		});
	} else {
		returnVal.result = false;
	}

	return returnVal;
};

module.exports = hasObjectRequiredKeys;
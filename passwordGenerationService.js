app.service('passwordGenerationService', function() {

	var NUMBERS = '0123456789';
	var CHARS_LOWERCASE = 'abcdefghijklnopqrstuvwxyz';
	var CHARS_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	this.generatePassword = function(options) {

		var charset = '';
		if(options.useNumbers) {
			charset += NUMBERS;
		}
		if(options.useLetters) {
			charset += CHARS_LOWERCASE + CHARS_UPPERCASE;
		}

	    var retVal;
	    do {
	    	retVal = '';
	    	for (var i = 0, n = charset.length; i < options.passwordLength; ++i) {
		        retVal += charset.charAt(Math.floor(Math.random() * n));
		    }	
	    } while(!checkPassword(retVal, options));
	    
	    return retVal;
	};

	function checkPassword(password, options) {
		if(options.useNumbers && !checkContains(password, NUMBERS)) {
			return false;
		} else if(options.useLetters && !checkContains(password, CHARS_LOWERCASE + CHARS_UPPERCASE)) {
			return false;
		} else {
			return true;
		}
	};

	function checkContains(password, charset) {
		return password.split('').some(function(el) {
			return charset.indexOf(el) != -1;
		})
	};

});
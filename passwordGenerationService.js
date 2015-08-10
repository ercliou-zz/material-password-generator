app.service('passwordGenerationService', function() {

	this.generatePassword = function(options) {

		var charset = '';
		if(options.useNumbers) {
			charset += '0123456789'
		}
		if(options.useLetters) {
			charset += 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		}

	    var retVal = '';
	    for (var i = 0, n = charset.length; i < options.passwordLength; ++i) {
	        retVal += charset.charAt(Math.floor(Math.random() * n));
	    }
	    return retVal;
	}

});
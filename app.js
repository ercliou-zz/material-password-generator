var app = angular.module('MaterialPasswordGeneratorApp', ['ngMaterial']);

app.constant("primaryPalette", "green")
.constant("accentPalette", "deep-orange")
.config(function($mdThemingProvider, primaryPalette, accentPalette) {
	$mdThemingProvider.theme('default')
	.primaryPalette(primaryPalette)
	.accentPalette(accentPalette);
})
.run(function ($rootScope, $mdColorPalette) {
	$rootScope.getMaterialColor = function (base, shade) {            
		var color = $mdColorPalette[base][shade].value;
		return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
	};
});

app.controller('MainCtrl', function($scope, $mdSidenav, $mdToast, passwordGenerationService, primaryPalette, accentPalette) {

	$scope.accentRgb = $scope.getMaterialColor(primaryPalette, 400)

	//$scope.result= '';
	$scope.doCopy = true;
	$scope.options = {
		useNumbers: true,
		useLetters: true,
		passwordLength: 10
	}

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	$scope.generate = function() {

		if($scope.options.useNumbers || $scope.options.useLetters) {
			if(hasMinimalLength($scope.options)){
				$scope.result = passwordGenerationService.generatePassword($scope.options);
				if($scope.doCopy) {
					$scope.copyToClipboard($scope.result);

					$mdToast.show($mdToast.simple()
						.content('Copied to clipboard!')
						.position('top')
						.hideDelay(2000));
				}
			} else {
				// TODO: change length automatically
				$mdToast.show($mdToast.simple()
					.content('Error. The length is too low to follow the rules.')
					.position('top')
					.hideDelay(3000));
			}
		} else {
			$mdToast.show($mdToast.simple()
				.content('Error. Please select at least one type of character.')
				.position('top')
				.hideDelay(3000));
		}
	}

	function hasMinimalLength() {
		return $scope.options.passwordLength >= minimalLength($scope.options);
	}

	function minimalLength(options) {
		var count = 0;
		if(options.useNumbers) count++;
		if(options.useLetters) count++;
		return count;
	}


	$scope.copyToClipboard = function(s) {

		var el = document.getElementById('buffer');
		el.innerText = s;

		var result = document.querySelector('#buffer');  
		var range = document.createRange();  
		range.selectNode(result);  
		window.getSelection().addRange(range);  


		document.execCommand('copy');
		window.getSelection().removeAllRanges();

		el.innerText = '';
	}

});
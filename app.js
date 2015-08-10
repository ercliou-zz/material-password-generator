var app = angular.module('MaterialPasswordGeneratorApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});

app.controller('MainCtrl', function($scope, $mdSidenav, passwordGenerationService) {

	$scope.result= '';

	$scope.options = {
		useNumbers: true,
		useLetters: true,
		passwordLength: 10
	}
  

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.generate = function() {
  	$scope.result = passwordGenerationService.generatePassword($scope.options);
  	$scope.copyToClipboard($scope.result)
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
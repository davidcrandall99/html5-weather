var app = angular.module("weatherApp", []);
app.controller("weatherCtrl", function ($scope) {
	$scope.latitude = "getting information";
	$scope.longitude = "getting information";
	function showLocation(position) {
		$scope.$apply(function() { 
			$scope.latitude = position.coords.latitude; 
		});
		
		$scope.$apply(function() {
			$scope.longitude = position.coords.longitude;
		});
		//$scope.latitude = latitude;
	}

	function errorHandler(err) {
		if (err.code == 1) {
			alert("Error: Access is denied!");
		} else if (err.code == 2) {
			alert("Error: Position is unavailable!");
		}
	}


		if (navigator.geolocation) {
			// timeout at 60000 milliseconds (60 seconds)
			var options = {
				timeout: 60000
			};
			navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
			
		} else {
			alert("Sorry, browser does not support geolocation!");
		}


});

var app = angular.module("weatherApp", []);
app.controller("weatherCtrl", function ($scope, $http) {
	$scope.latitude = "getting information";
	$scope.longitude = "getting information";
	$scope.city = "Getting your city";
	!$scope.foundLocation;
	function showLocation(position) {
		$scope.$apply(function () {
			$scope.latitude = position.coords.latitude;
		});

		$scope.$apply(function () {
			$scope.longitude = position.coords.longitude;
		});

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var theUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=eda675af27838319581929bf29229f14&l";
		console.log(theUrl);
		$http.get(theUrl)
			.success(function (response) {
				$scope.city = response.name;
				var kelvin = response.main.temp;
				var degreesExact = (kelvin * (9 / 5)) - 459.67;
				var degrees = Math.round(degreesExact)
				$scope.temperature = degrees;
				$scope.foundLocation = true;
			});

			

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
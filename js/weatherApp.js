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
		/*
		TO TEST COORDINATES AND WEATHER TYPES
		var theUrl = "http://api.openweathermap.org/data/2.5/weather?lat=41.0010&lon=-76.4540&APPID=eda675af27838319581929bf29229f14&l";
		*/
		console.log(theUrl);
		$http.get(theUrl)
			.success(function (response) {
				$scope.city = response.name;
				//variables
				var kelvin = response.main.temp;
				var degreesExact = (kelvin * (9 / 5)) - 459.67;
				var degrees = Math.round(degreesExact)
				var weatherType = response.weather[0].main;
				var date = new Date();
				var time = date.getHours();
				//Verify output
				console.log("Time: " + time);
				console.log("Degrees: " + degrees);
				console.log("Weather Type: " + weatherType);

				//set scope
				$scope.temperature = degrees;
				$scope.foundLocation = true;
				if (weatherType == "Clouds") {
					$scope.weatherType = "Cloudy";
				}
				else {
					$scope.weatherType = weatherType;
				}

				//define image directories and names
				if (weatherType == "Clear") {
					$scope.imageName = "clear";
				} 
				else if (weatherType == "Clouds") {
					$scope.imageName = "cloudy";
				} 
				else if (weatherType == "Partly Cloudy") {
					$scope.imageName = "partlycloudy";
				} 
				else {
					$scope.imageName = "rain";
				}

				//define image directory by time of day
				if (time > 18) {
					$scope.dayNight = "night";
				} else {
					$scope.dayNight = "day";
				}

				//Create full image CSS rule
				$scope.bgImage = "background-image: url(images/" + $scope.dayNight + "/" + $scope.imageName + ".jpg)";

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
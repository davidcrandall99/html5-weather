var app = angular.module("weatherApp", []);
app.controller("weatherCtrl", function ($scope, $http) {
	$scope.latitude = "getting information";
	$scope.longitude = "getting information";
	$scope.city = "Getting your city";
	!$scope.foundLocation;
	$scope.loading = true;

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
		
		//TO TEST COORDINATES AND WEATHER TYPES
		//var theUrl = "http://api.openweathermap.org/data/2.5/weather?lat=41.0010&lon=-76.4540&APPID=eda675af27838319581929bf29229f14&l";
		
		console.log(theUrl);
		$http.get(theUrl)
			.success(function (response) {
				$scope.city = response.name;
				//variables
				var kelvin = response.main.temp;
				var degreesExact = (kelvin * (9 / 5)) - 459.67;
				var degrees = Math.round(degreesExact)
				var weatherType = response.weather[0].main;
				var weatherDesc = response.weather[0].description;
				var date = new Date();
				var time = date.getHours();
				//generate random number for random picture
				var randomNum = Math.floor(Math.random()*(3-1+1)+1);
				//Verify output
				console.log("Time: " + time);
				console.log("Degrees: " + degrees);
				console.log("Weather Type: " + weatherType);
				console.log("Random number: " + randomNum);

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
					$scope.weather = "clear";
				} 
				else if (weatherType == "Clouds") {
					if (weatherDesc == "scattered clouds") {
						$scope.imageName = "partly-cloudy";
						$scope.weather = "partly cloudy";
					}
					else {
						$scope.imageName = "cloudy";
						$scope.weather = "cloudy";
					}
				} 
				else {
					$scope.imageName = "rain";
					$scope.weather = "rainy";
				}

				//define image directory by time of day
				if (time > 18) {
					$scope.dayNight = "night";
				} else {
					$scope.dayNight = "day";
				}

				//Create full image CSS rule
				$scope.bgImage = "background-image: url(images/" + $scope.dayNight + "/" + $scope.imageName + + randomNum + ".jpg)";

			});
	}

	function errorHandler(err) {
		if (err.code == 1) {
			
			$scope.$apply(function(){
				$scope.loading = false;
				$scope.declined = true;
			});
			
			
			
		} else if (err.code == 2) {
			$scope.$apply(function(){
				$scope.loading = false;
				$scope.notfound = true;
			});
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
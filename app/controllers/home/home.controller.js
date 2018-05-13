homeController.$inject = ["$scope", "$interval", "$http"];

function homeController ($scope, $interval, $http) {

    const apiUrl = "http://api.openweathermap.org/data/2.5";
    const apiID = "ead06aa2318e010b99280e6d54aaff31";

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocationData);
        } else {
            alert("Unfortunately, you can not use this app. Geolocation is not supported by this browser.");
        }
    }
    getLocation();

    function getLocationData(position) {
        $http({method: "GET", url: `${apiUrl}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiID}`})
            .then((response) => {
                renderData(response.data);
            }, (error) => {
                alert("Geolocation data not received");
                throw new Error("Geolocation data not received: " + error);
            });
    }

    function renderData(data) {
        $scope.data = data;
        $scope.cityName = data.name;
        $scope.country = data.sys.country;
        $scope.humidity = data.main.humidity;
        $scope.pressure = data.main.pressure;
        $scope.temp = data.main.temp;
        $scope.tempC = data.main.temp - 273.15; // to celsius
        $scope.weather = data.weather[0];
        $scope.maxTemp = data.main.temp_max;
        $scope.minTemp = data.main.temp_min;
        $scope.maxTempC = data.main.temp_max - 273.15; // to celsius
        $scope.minTempC = data.main.temp_min - 273.15; // to celsius
        $scope.windSpeed = data.wind.speed;
    }

    $interval(() => { // update location data each 20 minutes
        getLocation();
    }, 20 * 60 * 1000); // 20 min in milliseconds

    $scope.currentDate = new Date();
    $interval(() => {
        $scope.currentDate = new Date();
    }, 1000); // update time each minute
}

export default homeController;
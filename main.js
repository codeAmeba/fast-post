var long = 0;
var lat = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position.coords.latitude + ' ' + position.coords.longitude);
            apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + "1e924428f93ffebce6c7fdc3c4b15c00";
            console.log(111);
            callAPI();
        }, function (error) {
            long = 0;
            lat = 0;
            apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + "1e924428f93ffebce6c7fdc3c4b15c00";
            console.log(111);
            callAPI();
            console.error(error);
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    } else {
        alert('GPS를 지원하지 않습니다');
    }
}

function callAPI() {
    $.ajax({
        url: apiURI,
        dataType: "json",
        type: "GET",
        async: "false",
        success: function (resp) {
            console.log(resp);
            console.log("현재온도 : " + (resp.main.temp - 273.15));
            console.log("현재습도 : " + resp.main.humidity);
            console.log("날씨 : " + resp.weather[0].main);
            console.log("상세날씨설명 : " + resp.weather[0].description);
            console.log("날씨 이미지 : " + resp.weather[0].icon);
            console.log("바람   : " + resp.wind.speed);
            console.log("나라   : " + resp.sys.country);
            console.log("도시이름  : " + resp.name);
            console.log("구름  : " + (resp.clouds.all) + "%");
            weatherIcon = resp.weather[0].icon;
            $(".weather-item-icon").css("background", "url('http://openweathermap.org/img/w/" + weatherIcon + ".png'");
            $(".weather-loc").text(resp.name);
            $(".weather-CTMP").text(Math.round(resp.main.temp - 273.15) + "℃");
            $(".HTmp").text(Math.round(resp.main.temp_max - 273.15) + "℃");
            $(".LTmp").text(Math.round(resp.main.temp_min - 273.15) + "℃");
        }
    });
}

var apiURI = "";

var weatherIcon = '';
$(function () {
    getLocation();
});
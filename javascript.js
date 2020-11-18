const apiKey = "e3719cf60377859bef1cf25b4e1f30ec"
let cities = [];
let lat = "latitude";
let lon = "longitude";

function getWeatherData() {
    let queryURL = "api.openweathermap.org/data/2.5/weather?q=losangeles&appid=e3719cf60377859bef1cf25b4e1f30ec";
    console.log(queryURL);
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response)
    })
}


$("#searchBtn").on("Click",function (event) {
    event.preventDefault();
    let weather = $("#city-input").val();
    cities.push(weather);
    displayWeatherInfo(weather);
    getWeatherData();
})
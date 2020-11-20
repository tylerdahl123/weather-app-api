const apiKey = "e3719cf60377859bef1cf25b4e1f30ec"
let cities = ["New York", "San Francisco", "Chicago", "Phoenix"];//added test cities to try and get something to pull form the api..
let lat = "latitude";
let lon = "longitude";


function render(city) {
    let btn = $("<button>");
    btn.addClass("cityBtn");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}
  
function weatherInfo(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;//learned this during the project...make the key and city a variable to the user puts it into the url and thats what it searches for.//
    

  
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response)
        
        let lon = response.coord.lon;
        console.log(lon)
        let lat = response.coord.lat;
        console.log(lat);
        let queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
       $.ajax({
           url:queryUV,
           method: "GET",
       }).then(function (uvResponse) {
        //    console.log(uvResponse);
           let temp = response.main.temp;
           let wind = response.wind.speed;
           let hum = response.main.humidity
           let cityDiv= $("<div class='city'>");
           let header = $("<h4>").text(city);
           let p1 = $("<p>").text("Humidity: " + hum + "%");
           let p2 =$("<p>").text("Wind Speed: " + wind + "M.P.H")
           let p3 = $("<p>").text("Temperature: " + temp + " F")
           let p4 = $("<p>").text("UV Index: " + uvResponse.value);
cityDiv.append(header,p1,p2,p3,p4);

           $("#weather-view").empty();
            $("#weather-view").prepend(cityDiv);
       })
    })
    let queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;//another ajax call for the 5day forecast api//
$.ajax({
    url: queryURLForecast,
    method: "GET",
}).then(function(response) {
    console.log(response)
    var forecastResponse=response.list;
    $("#5day").empty();//empties the div

        for (var i= 0; i < forecastResponse.length; i++) {
            var fiveDay = $("<div class='card'>");

            
           
            var temp5=forecastResponse[i].main.temp;
            var hum5 =forecastResponse[i].main.humidity;

            
            var temp5 = $("<p class='card-text'>").text("Temp: " + temp5);
            var hum5 = $("<p class='card-text'>").text("Humidity: " + hum5);
            
            fiveDay.append(temp5);
            fiveDay.append(hum5);
            $("#5DayForecast").append(fiveDay);

        }
})

}

cities.forEach(function (city, store, arr) {
    renderButtons(city);

    if (store === arr.length - 1) {
        weatherInfo(city);
    }
})
 
    

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    let weather = $("#city-input").val();
    cities.push(weather);
    localStorage.setItem("weather", JSON.stringify(cities))
    render(weather);
    weatherInfo(weather)
    $("#5DayForecast").empty();
});
//controls what happens when you click the city buttons. 
$(document).on("click", ".cityBtn", function () {
    let city = $(this).attr("data-name");
    weatherInfo(city);
    console.log(weatherInfo())
    $("#5DayForecast").empty();
});
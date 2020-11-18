const apiKey = "e3719cf60377859bef1cf25b4e1f30ec"
let cities = ["New York", "San Francisco", "Chicago", "Phoenix"];//added test cities to try and get something to pull form the api..
let lat = "latitude";
let lon = "longitude";

cities.forEach(function (city, index, originalArr) {
    renderButtons(city);

    if (index === originalArr.length - 1) {
        displayWeatherInfo(city);
    }
})

function displayWeatherInfo(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;//learned this during the project...make the key and city a variable to the user puts it into the url and thats what it searches for.//


   
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        
        let lon = response.coord.lon;
        console.log(lon)
        let lat = response.coord.lat;
        console.log(lat);
        let queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
       $.ajax({
           url:queryUV,
           method: "GET",
       }).then(function (uvResponse) {
           console.log(uvResponse);
       })
       
       
       
       
       
       
       
        let temperature = response.main.temp;
        console.log(temperature)
        let humidity = response.main.humidity;
        console.log(response.main.humidity);


        let cityDiv =$("<div class='city'>");
        let header = $("<h4>").text(city);
        let p1 = $("<p>").text("TEMP:" + temperature + "F");
        let p2 = $("<p>").text("HUMIDITY: " + humidity + "%");
        cityDiv.append(header,p1,p2);
        $("#weather-view").empty();//empties the div of what was in it before 
        $("#weather-view").prepend(cityDiv);
        //managed to get the temp of where i am.//
    })}
//makes the cities listed into buttons so that the user can click on them. 
function renderButtons(city) {
    let btn = $("<button>");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}
//makes the search button do things//
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    let weather = $("#city-input").val();
    cities.push(weather);
    renderButtons(weather);
    displayWeatherInfo(weather)
});

$(document).on("click", ".city-btn", function () {
    let city = $(this).attr("data-name");
    displayWeatherInfo(city);
    console.log(displayWeatherInfo())
});
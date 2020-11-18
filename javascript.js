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
        console.log(response.main.temp)//managed to get the temp of where i am.//
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
    displayWeatherInfo(weather)
});


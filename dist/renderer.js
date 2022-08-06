class Renderer {
    renderCityWeather(allCitiesWeatherData) {
        $("#cities-weather-data-container").empty();
        const source = $('#city-weather-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({ allCitiesWeatherData});
        $("#cities-weather-data-container").append(newHTML)
    }
}
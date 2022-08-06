const tempManager = new TempManager()
const render = new Renderer()
const loadPage = async function () {
    await tempManager.getDataFromDB()
    render.renderCityWeather(tempManager.cityData)
}
const handleSearch = async function () {
    const cityName = $("#city-input").val()
    $("#city-input").val("")
    console.log(tempManager.cityData)
    await tempManager.getCityData(cityName)
    render.renderCityWeather(tempManager.cityData)
}
loadPage()
$('#cities-weather-data-container').on('click', ".save-city",  function () {
    const cityName = $(this).closest(".city-container").find("#title").text();
    console.log(cityName)
    tempManager.saveCity(cityName)
    render.renderCityWeather(tempManager.cityData)
    loadPage()
})
$('#cities-weather-data-container').on('click', ".remove-city",  function () {
    const cityName = $(this).closest(".city-container").find("#title").text();
    tempManager.removeCity(cityName)
    render.renderCityWeather(tempManager.cityData)
    loadPage()
})

$('#cities-weather-data-container').on('click', ".refresh-city",  function () {
    const cityName = $(this).closest(".city-container").find("#title").text();
    tempManager.updateCity(cityName)
    render.renderCityWeather(tempManager.cityData)
    loadPage()
})
const express = require('express');
const router = express.Router();
const City = require('../models/City');
const axios = require('axios')
const APIKEY = '72a5752f62d8297c54892ace64b04f99'
const IMAGE_URL = "http://openweathermap.org/img/w/"

router.get('/city/:cityName', async function (req, res) {
    let city = req.params.cityName;
    try {
        const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
        const cityWeatherStatus = new City({
            name: result.data.name,
            temperature: result.data.main.temp,
            condition: result.data.weather[0].description,
            conditionPic: `${IMAGE_URL}${result.data.weather[0].icon}.png`,
            inDB:false
        })
        res.send(cityWeatherStatus)
    } catch (err) {
        res.status(404).send("something went wrong with your request")
    }
})
router.get('/cities', async function (req, res) {
    const cities = await City.find({})
    res.status(200).send(cities)
})
router.post('/city', function (req, res) {
    const cityData = req.body
    const city = new City({
        name: cityData.name,
        temperature: cityData.temperature,
        condition: cityData.condition,
        conditionPic: cityData.conditionPic,
        inDB : cityData.inDB
    })
    city.save()
    res.status(201).send("added new city")
})
router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    City.deleteOne({ name: cityName }).exec((err, city) => {
        if (err) {
            throw (err)
        }
    })
    res.status(204).send("deleted city")
})
router.put('/city/:cityName', async function (req, res) {
    let cityName = req.params.cityName
    const newCityData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKEY}`)
    let c = await City.findOneAndDelete({ name: cityName })
    if(c){
        let city = new City({
            name: newCityData.data.name,
            temperature: newCityData.data.main.temp,
            condition: newCityData.data.weather[0].description,
            conditionPic: `${IMAGE_URL}${newCityData.data.weather[0].icon}.png`,
            inDB: true
        })
        city.save()
        res.status(201).send("updated city data")
    }
})
module.exports = router
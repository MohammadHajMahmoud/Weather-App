class TempManager {
    constructor() {

        this.cityData = []
    }

    async getDataFromDB() {

        let weatherDb = await $.get('/cities')
        this.cityData = weatherDb
    }

    async getCityData(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        let cityD = await $.get(`/city/${cityName}`)
        this.cityData.push(cityD)
    }

    saveCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        let city = this.cityData.find(c => c.name == cityName)
        if(!city.inDB){
            city.inDB = true
            $.post('/city', city)
        }
    }
    
    removeCity(cityName) {

        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        axios.delete(`/city/${cityName}`)

        const cityIndex = this.cityData.findIndex(d => d.name === cityName)
        this.cityData.splice(cityIndex, 1)
    }
     updateCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        axios.put(`/city/${cityName}`)
    }
    
}
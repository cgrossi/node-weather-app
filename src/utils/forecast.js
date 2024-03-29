const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/07adfcca545054047deac0a9d034860d/${long},${lat}?exclude=minutely,hourly,flags,alerts&units=si`

  request({ url, json:true }, (err, res, { error, currently, daily}) => {
    if(err) {
      callback("Unable to make request", undefined)
    } else if (error) {
      callback("Unable to find this location", undefined)
    } else {
      callback(undefined, `The temperature is currently ${currently.temperature} degrees Celcius. Cloud cover is approximately ${currently.cloudCover * 100}%. There is a ${currently.precipProbability * 100}% chance that it is raining right now. ${daily.summary} The UV Index is ${daily.data[0].uvIndex} for the day.`)
    }
  })
}

module.exports = forecast
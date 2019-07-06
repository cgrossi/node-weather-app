const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2dtYXBib3hhcGkiLCJhIjoiY2p4cW9ncnZ4MDBhbzNwbnliYWw3YjA5MyJ9.kOXwnsgxOwBUfXQhAD67JQ&limit=1`

  request({ url, json: true }, (err, res, { features, message }) => {
    if(err) {
      callback('Unable to make request', undefined)
    } else if (message || features.length < 1) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, { 
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode;
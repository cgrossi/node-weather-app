const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Set up directory paths
const publicPathDirectory = path.join(__dirname, '../public');
const viewsPathDirectory = path.join(__dirname, '../templates/views');

// Set the view engine and path to views
app.set('view engine', 'ejs');
app.set('views', viewsPathDirectory);

// Set up the directory static files are served from
app.use(express.static(publicPathDirectory));

app.get('/', (req, res) => {
  res.render('index', {
    title: "Weather Homepage",
    name: "Carmine Grossi"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me Page",
    name: "Carmine Grossi"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help Page",
    help: "This is our help page. If you need to find anything out we have our documentation here",
    name: "Carmine Grossi"
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must enter an address!'
    })
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if(err) {
      return res.send({ err })
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if(err) {
        return res.send({ err })
      }
      return res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404 Page Not Found",
    name: "Carmine Grossi",
    error: "Error, there is no help page here. Go to help from navigation."
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404 Page Not Found",
    name: "Carmine Grossi",
    error: "Error, Page not found."
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})
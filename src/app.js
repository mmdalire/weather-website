const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mark Dalire",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mark Dalire",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a sample message",
    title: "Help",
    name: "Mark Dalire",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: forecastData,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term!",
    });
    return;
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // res.send('Help article not found')
  res.render("404", {
    title: 404,
    name: "Mark Dalire",
    not_found_message: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  // res.send('My 404 page')
  res.render("404", {
    title: 404,
    name: "Mark Dalire",
    not_found_message: "Page not found!",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

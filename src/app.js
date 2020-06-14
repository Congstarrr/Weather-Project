const path = require("path")
const express = require("express");
const hbs = require("hbs");
const geo = require("./utils/geocode");
const weather = require("./utils/weathercode");
const colour = require('chalk');

const app = express();

// define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


// setup handlebars and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setup static directory 
app.use(express.static(publicPath));

// index
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    status: "active",
  });
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    status: "active",
  });
});

//
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({                           // same as doing if() {} else {}, here we need a 
      error: "You must provide a search term"   // return in order to terminate the process
    });
  }
  console.log(req.query.search);
  res.send({
    prodcuts: []
  });
});

// help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    status: "active",
  });
});



//weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({                           // same as doing if() {} else {}, here we need a 
      error: "You must provide an address term"   // return in order to terminate the process
    });
  }
  const address = req.query.address;
  geo(address, (error, info) => {
    if (error) {
      return res.send({ error })
    }
    weather(info.latitude, info.longitude, (error, output) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location: info.location,
        temperature: output.temperature
      })
    });
  });
});




//error
app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "ERROR 404: Help articel not found"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    message: "ERROR 404: Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});


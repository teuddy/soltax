// simple node web server that displays hello world
// optimized for Docker image

const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const database = require("./database");

// Appi
const app = express();

app.use(morgan("common"));

const cars = [
  {
    id: 1,
    brand: "Toyota",
    models: [
      {
        id: 1,
        name: "Corolla",
        years: [2022, 2021, 2020],
        versions: ["LE", "SE", "XSE"],
      },
      {
        id: 2,
        name: "Camry",
        years: [2022, 2021, 2020],
        versions: ["LE", "SE", "XSE"],
      },
    ],
  },
  {
    id: 2,
    brand: "Honda",
    models: [
      {
        id: 3,
        name: "Accord",
        years: [2022, 2021, 2020],
        versions: ["LX", "Sport", "Touring"],
      },
      {
        id: 4,
        name: "Civic",
        years: [2022, 2021, 2020],
        versions: ["LX", "Sport", "Touring"],
      },
    ],
  },
  {
    id: 3,
    brand: "Ford",
    models: [
      {
        id: 5,
        name: "Mustang",
        years: [2022, 2021, 2020],
        versions: ["Ecoboost", "GT", "Mach 1"],
      },
      {
        id: 6,
        name: "F-150",
        years: [2022, 2021, 2020],
        versions: ["XL", "XLT", "Lariat"],
      },
    ],
  },
];

//return a jsn response of car brands
app.get("/carbrands", function (req, res, next) {
  res.json(cars);
});

//based on car brand id return models
app.get("/carmodels/:id", function (req, res, next) {
  const id = req.params.id;
  //find brand and return models
  const brand = cars.find((brand) => brand.id == id);
  res.json(brand.models);
});

//get car model and return avaible years
app.get("/caryears/:id", function (req, res, next) {
  const id = req.params.id;
  //find brand and return models
  const brand = arr.find((brand) => brand.id == id);
  res.json(brand.models);
});

// app.post("/getData", function (req, res, next) {
//   //receives the car brand and models form frotnend
//   const data = req.body;
//   console.log(data);
// });

app.get("/", function (req, res, next) {
  database
    .raw("select VERSION() version")
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = app;

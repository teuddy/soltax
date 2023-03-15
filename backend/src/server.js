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


const connections = require('./database')


// Appi
const app = express();

app.use(morgan("common"));

app.get('/brands', function (req, res, next) {
  connections
    .select('*')
    .from('brands')
    .join('models', 'brands.id', '=', 'models.brand_id')
    .leftJoin(
      connections
        .select('model_id', connections.raw('GROUP_CONCAT(year) as years'))
        .from('model_years')
        .groupBy('model_id')
        .as('years'),
      'models.id',
      '=',
      'years.model_id'
    )
    .leftJoin(
      connections
        .select('model_id', connections.raw('GROUP_CONCAT(version_name) as versions'))
        .from('versions')
        .groupBy('model_id')
        .as('versions'),
      'models.id',
      '=',
      'versions.model_id'
    )
    .then((rows) => {
      const brands = rows.reduce((acc, row) => {
        const brand = acc.find((brand) => brand.id === row.brand_id);
        if (brand) {
          brand.models.push({
            id: row.id,
            name: row.model_name,
            years: row.years ? row.years.split(',') : [],
            versions: row.versions ? row.versions.split(',') : [],
          });
        } else {
          acc.push({
            id: row.brand_id,
            brand_name: row.brand_name,
            models: [
              {
                id: row.id,
                name: row.model_name,
                years: row.years ? row.years.split(',') : [],
                versions: row.versions ? row.versions.split(',') : [],
              },
            ],
          });
        }
        return acc;
      }, []);
      res.send(brands);
    });
});
//brand{id}
app.get("/brands/:id", function (req, res, next) {
  const id = req.params.id;
  //find brand and return models
  connections.select('*').from('brands').where('id', id)
  .then((rows) => {
    res.json(rows)
  }
  )
});
//models
app.get("/models", function (req, res, next) {
    connections('models').select('*')
    .then((rows) => {
        res.json(rows)
    }
    )
});
//model{id}
app.get("/models/:id", function (req, res, next) {
  const id = req.params.id;
  //find brand and return models
  connections.select('*').from('models').where('id', id)
  .then((rows) => {
    res.json(rows)
  }
  )
});

//verions 
app.get("/versions", function (req, res, next) {
    connections('versions').select('*')
    .then((rows) => {
        res.json(rows)
    }
    )
});
//version{id}
app.get("/versions/:id", function (req, res, next) {
  const id = req.params.id;
  //find brand and return models
  connections.select('*').from('versions').where('id', id)
  .then((rows) => {
    res.json(rows)
  }
  )
});

app.get("/", function (req, res, next) {
  // database
  //   .raw("select VERSION() version")
  //   .then(([rows, columns]) => rows[0])
  //   .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
  //   .catch(next);
  res.send("Hello World");
});

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = app;

const knex = require('knex');

const conf = require('../knexfile')

const connections = knex(conf.development)


connections.migrate.latest()
  .then(() => {
    console.log('Migrations completed successfully!');
    connections.destroy();
  })
  .catch(err => {
    console.error('Error running migrations:', err);
    connections.destroy();
  });

module.exports = connections;


// const knex = require('knex');
// const { database } = require('./config');

// module.exports = knex({
//   client: 'mysql2',
//   connection: database,
// });


//test connections 

const knex = require('knex');

const conf = require('../knexfile')

const connections = knex(conf.development)

module.exports = connections;



// knex.raw('SELECT 1')
//   .then(() => {
//     console.log('Database connection successful');
//   })
//   .catch(err => {
//     console.error('Error connecting to database:', err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });
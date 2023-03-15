require('dotenv').config()
const fs = require("fs");
const readFileSync = (filename) => fs.readFileSync(filename).toString("utf8");


// Constants
module.exports = {

  port: process.env.PORT || 8080,
  environmnet: process.env.NODE_ENV || 'development',
  databasesConfigurations:{
          development: {
            client: 'mysql',
            connection: {
              host: process.env.DATABASE_HOST || "localhost",
              port: process.env.DATABASE_PORT,
              database: process.env.DATABASE_DB,
              user: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD
                ? readFileSync(process.env.DATABASE_PASSWORD)
                : null,
            },
            migrations:{
              directory:__dirname + '/../migrations'
            },
            seeds:{
              directory:__dirname + '/../seeds'
            }
            
          },

          staging: {
            client: 'postgresql',
            connection: {
              database: 'my_db',
              user:     'username',
              password: 'password'
            },
            pool: {
              min: 2,
              max: 10
            },
            migrations: {
              tableName: 'knex_migrations'
            }
          },

          production: {
            client: 'postgresql',
            connection: {
              database: 'my_db',
              user:     'username',
              password: 'password'
            },
            pool: {
              min: 2,
              max: 10
            },
            migrations: {
              tableName: 'knex_migrations'
            }
          }
      }
};

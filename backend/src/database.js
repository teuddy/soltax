const knex = require('knex');
const {environmnet} = require('./config')
const conf = require('../knexfile')
const connections = knex(conf[environmnet]);

//want to know the db state, if you haven't run any migrations then run everything.
//but if you have run everything, jsut don't migrate anything.


///for testing porposes run a spefici migration 
//


connections.migrate.currentVersion().then(version=>{
    //if there's no version then you havent run any migrations so just run everything
    if(version ==="none"){
        console.log("Hey you haven't run any migration, [EXECUTING ALL]");
        connections.migrate.latest().then(()=>{
            console.log('ALL MIGRATIONS WHERE EXECUTED')
            return connections.seed.run()
        }).then(()=>{
            console.log("ALL SEEDS HAS BEEN EXECUTED")
        })

    }else{
        connections.migrate.list().then((list)=>{
            list[1].forEach((migration) => {
                console.log(`_-Executing pending migrations-_`);
                connections.migrate.up({name:migration.file})
              });
            // console.log(list)
        })
        // console.log("Hey at some point you have run migrations but i want to check if there's any migaration file peding id order to execute it")
    }
    //but if there's version, check each migration file and ensure all are run, if you find somes thar have not been run then execute it

})



module.exports = connections;


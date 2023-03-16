const knex = require('knex');
const {environmnet} = require('./config')
const conf = require('../knexfile')
const connections = knex(conf[environmnet]);


if (environmnet === 'development' || environmnet === 'staging') {
connections.migrate.currentVersion().then(version=>{
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
    }
})

}


module.exports = connections;


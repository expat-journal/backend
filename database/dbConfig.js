const knex = require( "knex" );
const config = require( "../knexfile.js" );

const dbEnv = process.env.NODE_ENV;
console.log( process.env.NODE_ENV );
module.exports = knex( config[ dbEnv ] );

require( "dotenv" ).config();
const pg = require( "pg" );

const path = require( "path" );
const dbPath = path.join( __dirname, "./database/expat.sqlite3" );

const localPg = {
    host:     "localhost",
    database: "expat_journal",
    user:     "postgres",
    password: "password",
};

const localPgTest = {
    host:     "localhost",
    database: "test",
    user:     "postgres",
    password: "password",
};

console.log( process.env.DATABASE_URL );
const productionDbConnection = process.env.DATABASE_URL || localPg;
module.exports = {
    development: {
        client:           "sqlite3",
        connection:       { filename: dbPath },
        useNullAsDefault: true,
        migrations:       {
            directory: "./database/migrations",
            tableName: "dbmigrations",
        },
        seeds:            { directory: "./database/seeds" },
        // by default SQLite will not enforce foreign keys
        pool:             {
            afterCreate: ( conn, done ) => {
                conn.run( "PRAGMA foreign_keys = ON", done ); // enforce FK
            },
        },
    },
    testing:     {
        client:     "pg",
        connection: localPgTest,
        migrations: {
            directory: "./database/migrations",
            tableName: "dbmigrations",
        },
    },
    
    production: {
        client:     "pg",
        connection: productionDbConnection, // could be an object or a string
        migrations: {
            directory: "./database/migrations",
        },
        seeds:      {
            directory: "./database/seeds",
        },
    },
    
};

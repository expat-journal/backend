exports.up = async function( knex, Promise ) {
    return knex.schema.table( "posts", table => {
        table.string( "country" ).notNullable();
        table.string( "city" ).notNullable();
        table.string( "state" ).notNullable();
    } );
    
};

exports.down = function( knex, Promise ) {
    return knex.table( "posts", table => {
        table.dropColumns( "country", "city", "state" );
    } );
};


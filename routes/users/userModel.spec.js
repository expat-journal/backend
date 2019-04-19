const users = require( "./usersModel" );
const db = require( "../../database/dbConfig" );
const cleaner = require( "knex-cleaner" );

const testUser = {
    user_name: "test user",
    password:  "password",
};
const testUser2 = {
    user_name: "test user2",
    password:  "password",
};

describe( "User model", () => {
        beforeEach( async () => {
            const result = await db.raw(
                "TRUNCATE users RESTART IDENTITY CASCADE" );
        } );
        describe( "insert()", () => {
            it( "should insert a user into the db", async () => {
                await users.insertUser( testUser );
                const userDb = await db( "users" );
                expect( userDb ).toHaveLength( 1 );
                expect( userDb ).
                    toEqual( [
                        {
                            ...testUser,
                            created_at: expect.any( Date ),
                            updated_at: expect.any( Date ),
                            id:         expect.any( Number )
                            
                        }
                    ] );
            } );
            
            it( "getAllUsers()", async () => {
                users.insertUser( testUser2 );
                const userModelUsers = await users.getAllUsers();
                const dbUsers = await db( "users" );
                expect( userModelUsers ).toEqual( dbUsers );
            } );
            
            it( "getUserByUserId", async () => {
                await users.insertUser( testUser );
                await users.insertUser( testUser2 );
                const user2 = await users.getUserById( 2 );
                expect( user2 ).toEqual( {
                    ...testUser2,
                    created_at: expect.any( Date ),
                    updated_at: expect.any( Date ),
                    id:         2,
                } );
            } );
            
            it( "getUserByUserName()", async () => {
                await users.insertUser( testUser );
                await users.insertUser( testUser2 );
                const user = await users.getUserByUserName( testUser.user_name );
                expect( user ).toEqual( {
                    ...testUser,
                    id:         expect.any( Number ),
                    created_at: expect.any( Date ),
                    updated_at: expect.any( Date ),
                } );
            } );
        } );
    }
);
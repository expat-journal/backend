const { getAllUsers, getUserById, insertUser, getUserByUserName, updateUser } = require(
    "./usersModel" );
const { getAllUsersPosts } = require( "../posts/postsModel" );
const usersRouter = require( "express" ).Router();
const { generateToken } = require( "../../api/tokenService" );
const restricted = require( "../../api/restricted" );
const bcrypt = require( "bcrypt" );

/**
 * @api {get} /users/:id        Get a user with the id.
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/users/11');
 *
 * @apiParam {Number} id    User id.
 *
 * @apiUse Error
 *
 * @apiSuccessExample User Data
 *
 {
        "id": 1,
        "created_at": "2019-04-13 09:01:42",
        "updated_at": "2019-04-13 18:54:22",
        "user_name": "Constance36"
    }
 *
 */
usersRouter.get( "/:id", restricted, ( req, res ) => {
    const id = req.params.id;
    getUserById( id ).then( user => {
        if ( !user ) {
            return res.status( 404 ).
                json( { message: "This user is lost.", status: 404 } );
        }
        const newUser = { ...user, password: undefined };
        res.status( 200 ).json( newUser );
    } ).catch( err => {
        console.log( err );
        res.status( 500 ).json( { message: err.message, status: 500 } );
    } );
    
} );

/**
 * @api {post} /users/register    Register a new user.
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam {String} user_name         Users username
 * @apiParam {String} password         Users password
 * @apiParam {String} [created_at]         Timestamp the user was created
 * @apiParam {String} [updated_at]         Timestamp the user was last updated.
 *
 * @apiExample Register example:
 * axios.post('/users/register', {
 *     user_name: "Constance36",
 *     password: "password"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Register Success
 *
 {
    "user": {
        "id": 105,
        "user_name": "jeremiah18",
        "created_at": "2019-04-16T02:00:45.244Z",
        "updated_at": "2019-04-16T02:00:45.244Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImlkIjoxMDUsInVzZXJfbmFtZSI6ImplcmVtaWFoMTgiLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xNlQwMjowMDo0NS4yNDRaIiwidXBkYXRlZF9hdCI6IjIwMTktMDQtMTZUMDI6MDA6NDUuMjQ0WiIsInBhc3N3b3JkIjoiJDJiJDA1JHRBNkljUUYuUTNmODZzLnoxS2VuV2VidzBQNkJicG40RXcvYVNsbUMuMEhyU0pHS2ZOdGpDIn0sImlhdCI6MTU1NTM4MDA0NSwiZXhwIjoxNTU1NDY2NDQ1fQ.NAKsX9kM6z4aGrT_TYNjf_sr-FMib5qgoV_zk3NNNg0"
}
 *
 */
usersRouter.post( "/register", ( req, res ) => {
    const user = req.body;
    if ( !user || !user.user_name || !user.password ) {
        return res.status( 400 ).
            json( {
                message: "Please include username and password in the request body.",
                status:  400
            } );
    }
    
    user.password = bcrypt.hashSync( user.password, 5 );
    insertUser( user ).then( user => {
        if ( user ) {
            const token = generateToken( user );
            res.status( 201 ).
                json( { user: { ...user[ 0 ], password: undefined }, token } );
            
        } else {
            throw { message: "Something went wrong", status: 500 };
        }
        
    } ).catch( err => {
        console.log( err );
        if ( err.message.includes( "duplicate key value" ) ) {
            return res.status( 400 ).
                json( { message: "Username is taken", status: 400 } );
        }
        res.status( err.status || 500 ).
            json( { message: err.message, status: err.status || 500 } );
    } );
    
} );

/**
 * @api {post} /users/login    Log a user in.
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} user_name         Users username
 * @apiParam {String} password         Users password
 *
 * @apiExample Login example:
 * axios.post('/users/login', {
 *     user_name: "Constance36",
 *     password: "password"
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Login Success
 *
 {
    "message": "Welcome jeremiah!",
    "user_name": "jeremiah",
    "id": 101
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xMyAyMzowMDoxNSIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTEzIDIzOjAwOjE1IiwidXNlcl9uYW1lIjoiamVyZW1pYWgiLCJpYXQiOjE1NTUxOTY0MzAsImV4cCI6MTU1NTI4MjgzMH0.3dY5x5o-OTRPLJwCc2mYSMzjsfdXomtHWvrc14QUvQ4"
}
 *
 */
usersRouter.post( "/login", ( req, res ) => {
    let { user_name, password } = req.body;
    
    getUserByUserName( user_name ).then( user => {
        
        if ( !user ) {
            return res.status( 404 ).
                json( {
                    message: "The user seems to have wondered off.",
                    status:  404
                } );
        }
        
        if ( bcrypt.compareSync( password, user.password ) ) {
            const token = generateToken( user );
            res.status( 200 ).
                json( {
                    message:   `Welcome ${ user.user_name }!`,
                    user_name: user.user_name,
                    id:        user.id,
                    status:    200,
                    token
                } );
        } else {
            res.status( 401 ).
                json( { message: "You shall not pass!", status: 401 } );
        }
    } ).catch( err => {
        console.log( err );
        res.status( err.status || 500 ).
            json( {
                message: err.message || "Server Err",
                status:  err.status || 500
            } );
    } );
    
} );

/**
 * @api {put} /users    Update user info.
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {Number} id                User id.
 * @apiParam {String} [user_name]         Users username
 * @apiParam {String} [password]         Users password
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.put('/users');
 *
 * @apiUse Error
 *
 * @apiSuccessExample Update Success
 *
 {
    "message": "Welcome jeremiah!",
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xMyAyMzowMDoxNSIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTEzIDIzOjAwOjE1IiwidXNlcl9uYW1lIjoiamVyZW1pYWgiLCJpYXQiOjE1NTUxOTY0MzAsImV4cCI6MTU1NTI4MjgzMH0.3dY5x5o-OTRPLJwCc2mYSMzjsfdXomtHWvrc14QUvQ4"
}
 *
 */
usersRouter.put( "/", restricted, ( req, res ) => {
    let user = req.body;
    const tokenUser = req.decodedToken;
    
    if ( tokenUser.id !== parseInt( user.id ) ) {
        return res.status( 401 ).
            json( {
                message: "You are not allowed to edit other peoples accounts.",
                status:  401
            } );
    }
    
    if ( user.password ) {
        user.password = bcrypt.hashSync( user.password, 14 );
    }
    
    updateUser( user ).then( result => {
        if ( result ) {
            getUserById( user.id ).then( dbUser => {
                res.status( 200 ).json( { ...dbUser, password: undefined } );
            } ).catch( err => {
                throw err;
            } );
        } else {
            throw {
                message: "Something went wrong while trying to update the user.",
                status:  500
            };
        }
    } ).catch( err => {
        res.status( err.status || 500 ).
            json( {
                message: err.message || "Server error",
                status:  err.status || 500
            } );
    } );
    
} );

/**
 * @api {get} /users/posts/:id    Get all post for a user.
 * @apiVersion 1.0.0
 * @apiName GetUserPosts
 * @apiGroup Users
 *
 * @apiParam {Number} id                User id.
 *
 * @apiHeader {String} authorization  User auth token.
 *
 * @apiExample Request example:
 * const request = axios.create({
 *     baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
 * });
 * request.get('/users/posts/5');
 *
 * @apiUse Error
 *
 * @apiSuccessExample Request Success
 *[
 {
        "id": 255,
        "created_at": "2019-04-15T10:18:46.000Z",
        "updated_at": "2019-04-16T01:08:12.937Z",
        "user_id": 14,
        "title": "aerial photography of buildings",
        "description": "Doloremque rerum qui nam similique fugit reiciendis molestias nisi voluptatibus.",
        "story": "Possimus dolor qui dolorem laborum cum et maiores sint. Libero debitis nobis pariatur. Vel molestiae labore sint quam et totam porro occaecati. Repellat sequi tempora.\n \rModi ipsum quia delectus omnis qui excepturi sint iure et. Eum voluptas cupiditate et alias. Ut assumenda dicta alias voluptatem corporis est et similique. Cumque sint aut autem voluptas omnis quae. Quia id eligendi vitae omnis. Voluptatem quia tempora quos voluptas eum deleniti.\n \rAt et aliquam natus. Excepturi omnis qui perspiciatis dolores animi dolorem. Voluptates ullam assumenda ut. Consequatur dolores est autem. Et nobis inventore sapiente dignissimos sed.",
        "likes": 0,
        "img_url": "https://images.unsplash.com/photo-1550604306-50c945776859?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU2NzU3fQ",
        "user_profile_img": null
    }...
 ]
 *
 */
usersRouter.get( "/posts/:id", restricted, ( req, res ) => {
    
    const id = req.params.id;
    if ( !id ) {
        return res.status( 400 ).
            json( {
                message: "You must include the users id in the params.",
                status:  400
            } );
    }
    getAllUsersPosts( id ).then( posts => {
        return res.status( 200 ).json( posts );
    } ).catch( err => {
        res.status( 500 ).
            json( {
                message: "Something went wrong trying to get the users posts.",
                status:  500
            } );
    } );
} );

module.exports = usersRouter;
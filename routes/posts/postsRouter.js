const postsRouter = require( "express" ).Router();
const { getRecentPosts, getPostById, insertPost, updatePost, getPostUserId, deletePost, getUserIdOfPost, getAllPosts } = require(
    "./postsModel" );
const { getCommentsByPostId } = require( "../comments/commentsModal" );
// const MiniSearch = require( "minisearch" );
const Fuse = require( "fuse.js" );

/**
 * @api {get} /posts/:offset     Gets posts ordered by updated_at
 * @apiVersion 1.0.0
 * @apiName GetPosts
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {Number} offset      The number to start the posts at.
 *
 * @apiExample Request example:
 * axios.post('/posts/20', {
 *     headers: {
 *         authorization: "token"
 *     }
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Posts Data
 *[
 {
        "id": 2,
        "created_at": "2019-04-15T22:40:06.000Z",
        "updated_at": "2019-04-16T16:21:40.204Z",
        "user_id": 38,
        "title": "green leaf trees under blue sky",
        "description": "Autem tenetur impedit aut explicabo soluta sint sunt vel corporis.",
        "story": "Et sed fugit. In fugit placeat praesentium. Dolores est id facilis itaque quibusdam ut.\n \rQuia dolorum quibusdam adipisci amet unde enim. Itaque a repellendus deleniti voluptatibus aut nisi. Vero consequuntur placeat quod saepe aliquam odit illo. Rem eos omnis quam et. Iste repellendus nihil voluptatem quo.\n \rEt qui repellat rerum ut deserunt assumenda. Dicta libero non. Et et fugiat id eum hic nam itaque. Dolore magni facere maiores. Vel corrupti qui assumenda sapiente consequatur delectus sit. Iste expedita ut officiis.",
        "likes": 0,
        "img_url": "https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU2NzU3fQ",
        "user_profile_img": null,
        "country": "Rwanda",
        "city": "Bartellton",
        "state": "New Mexico",
        "user_name": "Maxine.Larson"
    }...
 ]
 *
 */
postsRouter.get( "/:offset", ( req, res ) => {
    const offset = req.params.offset;
    const user = req.decodedToken;
    if ( !user || !offset ) {
        return res.status( 400 ).
            json( { message: "You must have set a offset number" } );
    }
    
    getRecentPosts( offset ).then( results => {
        res.status( 200 ).json( results );
    } ).catch( err => {
        console.log( err );
        res.status( err.status || 500 ).
            json( {
                message: err.message || "Server error",
                status:  err.status || 500
            } );
    } );
} );

/**
 * @api {get} /posts/id/:id     Gets post by id
 * @apiVersion 1.0.0
 * @apiName GetPostById
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {Number} id      The id of the post.
 *
 * @apiExample Request example:
 * axios.post('/posts/id/5', {
 *     headers: {
 *         authorization: "token"
 *     }
 * });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Posts Data
 *
 {
    "id": 2,
    "created_at": "2019-04-15T22:40:06.000Z",
    "updated_at": "2019-04-16T16:21:40.204Z",
    "user_id": 38,
    "title": "green leaf trees under blue sky",
    "description": "Autem tenetur impedit aut explicabo soluta sint sunt vel corporis.",
    "story": "Et sed fugit. In fugit placeat praesentium. Dolores est id facilis itaque quibusdam ut.\n \rQuia dolorum quibusdam adipisci amet unde enim. Itaque a repellendus deleniti voluptatibus aut nisi. Vero consequuntur placeat quod saepe aliquam odit illo. Rem eos omnis quam et. Iste repellendus nihil voluptatem quo.\n \rEt qui repellat rerum ut deserunt assumenda. Dicta libero non. Et et fugiat id eum hic nam itaque. Dolore magni facere maiores. Vel corrupti qui assumenda sapiente consequatur delectus sit. Iste expedita ut officiis.",
    "likes": 0,
    "img_url": "https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU2NzU3fQ",
    "user_profile_img": null,
    "country": "Rwanda",
    "city": "Bartellton",
    "state": "New Mexico",
    "user_name": "Maxine.Larson"
    "comments": [
        {
            "id": 268,
            "created_at": "2019-04-14 00:50:05",
            "updated_at": "2019-04-15 01:19:26",
            "comment": "Dolor rerum eaque dolore praesentium non dolores. Aspernatur sed sit dolorem cumque omnis exercitationem iure quibusdam eum. Animi enim assumenda porro et aut enim non. Consequatur aut quisquam repellat.",
            "user_id": 74,
            "post_id": 45,
            "user_name": "Ocie_Gusikowski"
        }...
    ]
}
 *
 */
postsRouter.get( "/id/:id", ( req, res ) => {
    const id = req.params.id;
    const user = req.decodedToken;
    if ( !user || !id ) {
        return res.status( 400 ).
            json( { message: "You must have a id in the params." } );
    }
    
    getPostById( id ).then( results => {
        
        if ( !results ) {
            return res.status( 404 ).
                json( {
                    message: "That post seems to be in another filing cabinet.",
                    status:  404
                } );
        }
        
        getCommentsByPostId( results.id ).then( comments => {
            if ( comments ) {
                results.comments = comments;
                return res.status( 200 ).json( results );
            } else {
                results.comments = [];
                return res.status( 200 ).json( results );
            }
        } ).catch( () => {
            results.comments = "Something went wrong trying to collect the comments.";
            return res.status( 500 ).json( results );
        } );
        
    } ).catch( err => {
        console.log( err );
        res.status( err.status || 500 ).
            json( {
                message: err.message || "Server error",
                status:  err.status || 500
            } );
    } );
} );

/**
 * @api {post} /posts/   Create a post
 * @apiVersion 1.0.0
 * @apiName CreatePost
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {String} title             The title of the post.
 * @apiParam {String} description       Short description of the post.
 * @apiParam {Text} story               The story of the post.
 * @apiParam {String} img_url            The picture url.
 * @apiParam {String} city              The city the post was taken in.
 * @apiParam {String} state             The state the post was taken in.
 * @apiParam {String} country           The country the post was taken in.
 * @apiParam {Number} [likes]           Number of times the post has been
 *     liked.
 * @apiParam {String} [user_profile_img] The users profile image url.
 * @apiParam {String} [created_at]      Time and date the post was created.
 * @apiParam {String} [updated_at]      Time and date the post was updated.
 *
 * @apiExample Create post example:
 * const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.post("/posts", {
    title: "Some Title",
    description: "Some description",
    story: "Lots of text here.",
    img_url: "http://SomeUrl.something",
    city: "Colorado Springs",
    state: "Colorado",
    country: "United States of America"
 });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Posts Data
 *
 {
        "id": 2,
        "created_at": "2019-04-15T22:40:06.000Z",
        "updated_at": "2019-04-16T16:21:40.204Z",
        "user_id": 38,
        "title": "green leaf trees under blue sky",
        "description": "Autem tenetur impedit aut explicabo soluta sint sunt vel corporis.",
        "story": "Et sed fugit. In fugit placeat praesentium. Dolores est id facilis itaque quibusdam ut.\n \rQuia dolorum quibusdam adipisci amet unde enim. Itaque a repellendus deleniti voluptatibus aut nisi. Vero consequuntur placeat quod saepe aliquam odit illo. Rem eos omnis quam et. Iste repellendus nihil voluptatem quo.\n \rEt qui repellat rerum ut deserunt assumenda. Dicta libero non. Et et fugiat id eum hic nam itaque. Dolore magni facere maiores. Vel corrupti qui assumenda sapiente consequatur delectus sit. Iste expedita ut officiis.",
        "likes": 0,
        "img_url": "https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjU2NzU3fQ",
        "user_profile_img": null,
        "country": "Rwanda",
        "city": "Bartellton",
        "state": "New Mexico",
        "user_name": "Maxine.Larson"
}
 *
 */
postsRouter.post( "/", ( req, res ) => {
    
    const user = req.decodedToken;
    if ( !user ) {
        return res.status( 400 ).
            json( { message: "You must be logged in as a user." } );
    }
    
    const post = req.body;
    if ( !post || !post.title || !post.description || !post.story ) {
        return res.status( 400 ).
            json( {
                message: "You must include all the post details.",
                status:  400
            } );
    }
    
    if ( !post.img_url ) {
        return res.status( 400 ).
            json( {
                message: "You need to include the image url.",
                status:  400
            } );
    }
    
    post.user_id = user.id;
    
    insertPost( post ).then( post => {
        if ( post ) {
            return res.status( 201 ).json( post );
        } else {
            throw {
                message: "Something went wrong while trying to insert the post.",
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
 * @api {put} /posts/   Update a post
 * @apiVersion 1.0.0
 * @apiName UpdatePost
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {Number} id                    Post id.
 * @apiParam {String} [title]               The title of the post.
 * @apiParam {String} [description]         Short description of the post.
 * @apiParam {Text} [story]                 The story of the post.
 * @apiParam {String} [img_url]             The picture url.
 * @apiParam {Number} [likes]        Number of times the post has been liked.
 * @apiParam {String} [user_profile_img]    The users profile image url.
 * @apiParam {String} [created_at]          Time and date the post was created.
 * @apiParam {String} [updated_at]          Time and date the post was updated.
 *
 * @apiExample Update post example:
 * const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.put("/posts", {
    id: 979,
    likes: 25
 });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Update post success
 *
 {
    "id": 979,
    "created_at": "2019-04-15 02:09:55",
    "updated_at": "2019-04-15 02:09:55",
    "user_id": 101,
    "title": "Some title",
    "description": "ffnkdl;ahijfkdls;a",
    "story": "fjdka;fjdinaklf;dfids;",
    "likes": 25,
    "img_url": "https://www.someurl.com",
    "user_profile_img": null,
    "user_name": "jeremiah"
}
 *
 */
postsRouter.put( "/", ( req, res ) => {
    
    const user = req.decodedToken;
    if ( !user ) {
        return res.status( 400 ).
            json( { message: "You must be logged in as a user." } );
    }
    
    const post = req.body;
    if ( !post || !post.id ) {
        return res.status( 400 ).
            json( {
                message: "You must include the post id in the request body.",
                status:  400
            } );
    }
    
    getPostUserId( post.id ).then( id => {
        if ( user.id !== id.user_id ) {
            throw {
                message: "You are not allowed to edit other peoples posts.",
                status:  401
            };
        }
        
        updatePost( post ).then( result => {
            if ( result === 1 ) {
                getPostById( post.id ).
                    then( post => res.status( 200 ).json( post ) ).
                    catch( err => {
                        throw err;
                    } );
            } else {
                throw {
                    message: "Something went wrong while trying to update the post.",
                    status:  500
                };
            }
        } );
        
    } ).catch( err => {
        console.log( err );
        res.status( err.status || 500 ).
            json( {
                message: err.message || "Server error",
                status:  err.status || 500
            } );
    } );
    
} );

/**
 * @api {delete} /posts/:id   Delete a post
 * @apiVersion 1.0.0
 * @apiName DeletePost
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {Number} id                    Post id.
 *
 * @apiExample Delete post example:
 * const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.delete("/posts/56");
 *
 * @apiUse Error
 *
 * @apiSuccessExample Update post success
 *
 {
    message: "Success",
    status: 200
}
 *
 */
postsRouter.delete( "/:id", ( req, res ) => {
    
    const id = req.params.id;
    
    if ( !id ) {
        return res.status( 400 ).
            json( {
                message: "You must include the post id in your request.",
                status:  400
            } );
    }
    
    const user = req.decodedToken;
    
    getUserIdOfPost( id ).then( result => {
        if ( result.user_id !== user.id ) {
            return res.status( 401 ).
                json( {
                    message: "You must be the post owner in order to remove it.",
                    status:  401
                } );
        }
        
        deletePost( id ).then( result => {
            if ( result === 1 ) {
                return res.status( 200 ).
                    json( { message: "Success", status: 200 } );
            }
        } ).catch( err => {
            throw err;
        } );
    } ).catch( err => {
        return res.status( 500 ).json( { message: "Say what?", status: 500 } );
    } );
    
} );

/**
 * @api {post} /posts/search   Search posts by country, state, city, or
 *     description
 * @apiVersion 1.0.0
 * @apiName SearchPosts
 * @apiGroup Posts
 *
 * @apiHeader {String} authorization    The token given to the user at login.
 *
 * @apiParam {String} query             Search phrase.
 *
 * @apiExample Delete post example:
 * const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.post("/posts/search", {
    query: "Search phrase"
 });
 *
 * @apiUse Error
 *
 * @apiSuccessExample Update post success
 *
 {
    message: "Success",
    status: 200
}
 *
 */
postsRouter.post( "/search", ( req, res ) => {
    
    const { query } = req.body;
    
    if ( !query ) {
        return res.status( 400 ).
            json( {
                message: "You must include the query phrase to search for.",
                status:  400
            } );
    }
    
    getAllPosts().then( posts => {
        
        const options = {
            shouldSort:         true,
            threshold:          0.3,
            location:           0,
            distance:           100,
            maxPatternLength:   32,
            minMatchCharLength: 1,
            keys:               [ "country", "state", "city", "description" ],
        };
        
        const fuse = new Fuse( posts, options );
        let results = fuse.search( query );
        res.status( 200 ).json( results );
        
    } );
    
} );

module.exports = postsRouter;
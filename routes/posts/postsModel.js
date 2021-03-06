const db = require( "../../database/dbConfig" );

const getRecentPosts = offset => {
    return db( "posts" ).
        leftJoin( "users", "user_id", "users.id" ).
        select( [ "posts.*", "users.user_name" ] ).
        orderBy( "updated_at", "desc" ).
        limit( 20 ).
        offset( offset );
};

const getPostById = id => {
    return db( "posts" ).
        leftJoin( "users", "user_id", "users.id" ).
        select( [ "posts.*", "users.user_name" ] ).
        where( { "posts.id": id } ).
        first();
};

const updatePost = post => {
    return db( "posts" ).where( { id: post.id } ).update( post );
};

const insertPost = post => {
    return db( "posts" ).
        returning( [
            "title", "description", "story", "img_url", "likes", "created_at",
            "updated_at", "id"
        ] ).
        insert( post );
};

const getPostUserId = id => {
    return db( "posts" ).select( "user_id" ).where( { id } ).first();
};

const getAllUsersPosts = userId => {
    return db( "posts" ).where( { user_id: userId } );
};

const deletePost = id => {
    return db( "posts" ).where( { id } ).delete();
};

const getUserIdOfPost = id => {
    return db( "posts" ).select( "user_id" ).where( { id } ).first();
};

const getAllPosts = () => {
    return db( "posts" );
};

module.exports = {
    getRecentPosts,
    getPostById,
    insertPost,
    updatePost,
    getPostUserId,
    getAllUsersPosts,
    deletePost,
    getUserIdOfPost,
    getAllPosts
};
const db = require( "../../database/dbConfig" );

const getCommentById = id => {
    return db( "comments" ).where( { id } ).first();
};

const getCommentsByPostId = postId => {
    return db( "comments" ).
        leftJoin( "users", "user_id", "users.id" ).
        select( [ "comments.*", "users.user_name" ] ).
        where( { "comments.post_id": postId } );
};

const getUserIdOfComment = id => {
    return db( "comments" ).select( "user_id" ).where( { id } ).first();
};

const addComment = comment => {
    return db( "comments" ).
        returning(
            [
                "comment", "post_id", "created_at", "updated_at", "likes", "id"
            ] ).
        insert( comment );
};

const editComment = comment => {
    return db( "comments" ).where( { id: comment.id } ).update( comment );
};

const delteComment = id => {
    return db( "comments" ).where( { id } ).delete();
};

module.exports = {
    getCommentById,
    getCommentsByPostId,
    addComment,
    editComment,
    delteComment,
    getUserIdOfComment,
};
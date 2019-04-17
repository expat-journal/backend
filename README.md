# Expat Journal v1.0.0

Api for Expat Journal. A web application for storing and sharing user experiences while traveling.

- [Comments](#comments)
	- [Create a comment.](#create-a-comment.)
	- [Delete a comment.](#delete-a-comment.)
	- [Get all comments for a post.](#get-all-comments-for-a-post.)
	- [Update a comment.](#update-a-comment.)
	
- [Posts](#posts)
	- [Create a post](#create-a-post)
	- [Delete a post](#delete-a-post)
	- [Gets post by id](#gets-post-by-id)
	- [Gets posts ordered by updated_at](#gets-posts-ordered-by-updated_at)
	- [Update a post](#update-a-post)
	
- [Users](#users)
	- [Get a user with the id.](#get-a-user-with-the-id.)
	- [Get all post for a user.](#get-all-post-for-a-user.)
	- [Log a user in.](#log-a-user-in.)
	- [Register a new user.](#register-a-new-user.)
	- [Update user info.](#update-user-info.)
	


# Comments

## Create a comment.



	POST /comments

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| comment			| Text			|  <p>Comment to add to post.</p>							|
| post_id			| Number			|  <p>Id of the post to add the comment to.</p>							|
| created_at			| String			| **optional** <p>Id of the post to add the comment to.</p>							|
| updated_at			| String			| **optional** <p>Id of the post to add the comment to.</p>							|
| likes			| Number			| **optional** <p>Number of likes the comment has.</p>							|

### Examples

Post comment example:

```
const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.post("/comments", {
    comment: "Long string",
    post_id: 45,
 });
```

### Success Response

Create post success.

```
{
    "id": 5876,
    "created_at": "2019-04-15 01:41:41",
    "updated_at": "2019-04-15 01:41:41",
    "comment": "Some text here",
    "likes": 0,
    "user_id": 101,
    "post_id": 45
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Delete a comment.



	DELETE /comments/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Id of the comment to delete.</p>							|

### Examples

Post comment example:

```
const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.delete("/comments/798");
```

### Success Response

Delete post success.

```
{
    message: "Success",
    status: 200
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Get all comments for a post.



	GET /comments/post_id/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the post you are collecting comments for.</p>							|

### Examples

Get comments example:

```
const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.get("/comments/post_id/45");
```

### Success Response

Posts Data

```
[
 {
        "id": 273,
        "created_at": "2019-04-14 18:00:08",
        "updated_at": "2019-04-15 01:38:18",
        "comment": "Autem doloremque est quia sed sequi cumque dolor quaerat recusandae. Autem quia quasi qui in quisquam occaecati exercitationem. Dignissimos ea placeat iusto cumque dolores numquam quidem. Quis quia veritatis odit sed.",
        "likes": 0,
        "user_id": 30,
        "post_id": 45,
        "user_name": "Ellen91"
    },
 {
        "id": 274,
        "created_at": "2019-04-14 18:27:45",
        "updated_at": "2019-04-15 01:38:18",
        "comment": "Labore voluptatibus sed asperiores mollitia adipisci doloremque quo. Deleniti itaque voluptatem asperiores rerum sit nemo vitae consequuntur.",
        "likes": 0,
        "user_id": 95,
        "post_id": 45,
        "user_name": "Alvena44"
    }....
 ]
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Update a comment.



	PUT /comments

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Post id.</p>							|
| post_id			| Number			| **optional** <p>Id of the post to add the comment to.</p>							|
| comment			| Text			| **optional** <p>Comment to add to post.</p>							|
| created_at			| String			| **optional** <p>Id of the post to add the comment to.</p>							|
| updated_at			| String			| **optional** <p>Id of the post to add the comment to.</p>							|
| likes			| Number			| **optional** <p>Number of likes the comment has.</p>							|

### Examples

Post comment example:

```
const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.put("/comments", {
    id: 273,
    likes: 20
 });
```

### Success Response

Create post success.

```
{
    "id": 273,
    "created_at": "2019-04-14 18:00:08",
    "updated_at": "2019-04-15 01:38:18",
    "comment": "Autem doloremque est quia sed sequi cumque dolor quaerat recusandae. Autem quia quasi qui in quisquam occaecati exercitationem. Dignissimos ea placeat iusto cumque dolores numquam quidem. Quis quia veritatis odit sed.",
    "likes": 20,
    "user_id": 101,
    "post_id": 45
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
# Posts

## Create a post



	POST /posts/

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>The title of the post.</p>							|
| description			| String			|  <p>Short description of the post.</p>							|
| story			| Text			|  <p>The story of the post.</p>							|
| img_url			| String			|  <p>The picture url.</p>							|
| city			| String			|  <p>The city the post was taken in.</p>							|
| state			| String			|  <p>The state the post was taken in.</p>							|
| country			| String			|  <p>The country the post was taken in.</p>							|
| likes			| Number			| **optional** <p>Number of times the post has been liked.</p>							|
| user_profile_img			| String			| **optional** <p>The users profile image url.</p>							|
| created_at			| String			| **optional** <p>Time and date the post was created.</p>							|
| updated_at			| String			| **optional** <p>Time and date the post was updated.</p>							|

### Examples

Create post example:

```
const instance = axios.create({
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
```

### Success Response

Posts Data

```

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
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Delete a post



	DELETE /posts/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Post id.</p>							|

### Examples

Delete post example:

```
const instance = axios.create({
        baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
    });
 
 instance.delete("/posts/56");
```

### Success Response

Update post success

```

 {
    message: "Success",
    status: 200
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Gets post by id



	GET /posts/id/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the post.</p>							|

### Examples

Request example:

```
axios.post('/posts/id/5', {
    headers: {
        authorization: "token"
    }
});
```

### Success Response

Posts Data

```

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
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Gets posts ordered by updated_at



	GET /posts/:offset

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| offset			| Number			|  <p>The number to start the posts at.</p>							|

### Examples

Request example:

```
axios.post('/posts/20', {
    headers: {
        authorization: "token"
    }
});
```

### Success Response

Posts Data

```
[
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
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Update a post



	PUT /posts/

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>The token given to the user at login.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>Post id.</p>							|
| title			| String			| **optional** <p>The title of the post.</p>							|
| description			| String			| **optional** <p>Short description of the post.</p>							|
| story			| Text			| **optional** <p>The story of the post.</p>							|
| img_url			| String			| **optional** <p>The picture url.</p>							|
| likes			| Number			| **optional** <p>Number of times the post has been liked.</p>							|
| user_profile_img			| String			| **optional** <p>The users profile image url.</p>							|
| created_at			| String			| **optional** <p>Time and date the post was created.</p>							|
| updated_at			| String			| **optional** <p>Time and date the post was updated.</p>							|

### Examples

Update post example:

```
const instance = axios.create({
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
```

### Success Response

Update post success

```

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
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
# Users

## Get a user with the id.



	GET /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User auth token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>User id.</p>							|

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/users/11');
```

### Success Response

User Data

```

{
       "id": 1,
       "created_at": "2019-04-13 09:01:42",
       "updated_at": "2019-04-13 18:54:22",
       "user_name": "Constance36"
   }
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Get all post for a user.



	GET /users/posts/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User auth token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>User id.</p>							|

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.get('/users/posts/5');
```

### Success Response

Request Success

```
[
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
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Log a user in.



	POST /users/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| user_name			| String			|  <p>Users username</p>							|
| password			| String			|  <p>Users password</p>							|

### Examples

Login example:

```
axios.post('/users/login', {
    user_name: "Constance36",
    password: "password"
});
```

### Success Response

Login Success

```

 {
    "message": "Welcome jeremiah!",
    "user_name": "jeremiah",
    "id": 101
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xMyAyMzowMDoxNSIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTEzIDIzOjAwOjE1IiwidXNlcl9uYW1lIjoiamVyZW1pYWgiLCJpYXQiOjE1NTUxOTY0MzAsImV4cCI6MTU1NTI4MjgzMH0.3dY5x5o-OTRPLJwCc2mYSMzjsfdXomtHWvrc14QUvQ4"
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Register a new user.



	POST /users/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| user_name			| String			|  <p>Users username</p>							|
| password			| String			|  <p>Users password</p>							|
| created_at			| String			| **optional** <p>Timestamp the user was created</p>							|
| updated_at			| String			| **optional** <p>Timestamp the user was last updated.</p>							|

### Examples

Register example:

```
axios.post('/users/register', {
    user_name: "Constance36",
    password: "password"
});
```

### Success Response

Register Success

```

 {
    "user": {
        "id": 105,
        "user_name": "jeremiah18",
        "created_at": "2019-04-16T02:00:45.244Z",
        "updated_at": "2019-04-16T02:00:45.244Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImlkIjoxMDUsInVzZXJfbmFtZSI6ImplcmVtaWFoMTgiLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xNlQwMjowMDo0NS4yNDRaIiwidXBkYXRlZF9hdCI6IjIwMTktMDQtMTZUMDI6MDA6NDUuMjQ0WiIsInBhc3N3b3JkIjoiJDJiJDA1JHRBNkljUUYuUTNmODZzLnoxS2VuV2VidzBQNkJicG40RXcvYVNsbUMuMEhyU0pHS2ZOdGpDIn0sImlhdCI6MTU1NTM4MDA0NSwiZXhwIjoxNTU1NDY2NDQ1fQ.NAKsX9kM6z4aGrT_TYNjf_sr-FMib5qgoV_zk3NNNg0"
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```
## Update user info.



	PUT /users

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>User auth token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>User id.</p>							|
| user_name			| String			| **optional** <p>Users username</p>							|
| password			| String			| **optional** <p>Users password</p>							|

### Examples

Request example:

```
const request = axios.create({
    baseURL: 'http://localhost:3200',
        timeout: 1000,
        headers: {
            authorization: "userTokenGoesHere"
        }
});
request.put('/users');
```

### Success Response

Update Success

```

 {
    "message": "Welcome jeremiah!",
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0xMyAyMzowMDoxNSIsInVwZGF0ZWRfYXQiOiIyMDE5LTA0LTEzIDIzOjAwOjE1IiwidXNlcl9uYW1lIjoiamVyZW1pYWgiLCJpYXQiOjE1NTUxOTY0MzAsImV4cCI6MTU1NTI4MjgzMH0.3dY5x5o-OTRPLJwCc2mYSMzjsfdXomtHWvrc14QUvQ4"
}
```
### Error Response

Error Example:

```
ERROR XXX
{
    "status": xxx,
    "message": "Some Error Message"
}
```


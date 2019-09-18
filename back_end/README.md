# A JSON Placeholder GraphQL API

A simple GraphQL endpoint wrapping the *AWESOME*
<a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>, a fake online REST API for testing and prototyping
</br></br>
## json-placeholder-graphql

This codebase and <a href="https://json-placeholder-graphql.herokuapp.com/graphql">free tier Heroku deplyment</a> offers the GraphiQL ui as a simple sandbox to try all of the specific GET queries offered by <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>. The "Good Stuff" is in the Schema.js file. 
</br></br>
## Example Queries, (Only GET has been implemented)

All Graphql queries are entered into the GraphiQL ui:

* Posts https://jsonplaceholder.typicode.com/posts/1
```
{
  post(id:1){
    userId
    id
    title
    body
  }
}
```

* Comments https://jsonplaceholder.typicode.com/comments/1
```
{
  comment(id: 1) {
    postId
    id
    name
    email
    body
  }
}
```
* Albums https://jsonplaceholder.typicode.com/albums/1
```
{
  album(id: 1) {
    userId
    id
    title
  }
}
```

* Photos https://jsonplaceholder.typicode.com/photos/1 
```
{
  photo(id: 1) {
    albumId
    id
    title
    url
    thumbnailUrl
  }
}
```

* Todos https://jsonplaceholder.typicode.com/todos/1
```
{
  todo(id: 1) {
    userId
    id
    title
    completed
  }
}
```

* Users https://jsonplaceholder.typicode.com/users/1
* (The UserType schema is truncated from the existing JSON Placeholder offerings.)
```
{
  user(id: 1) {
    id
    username
    email
    phone
    website
  }
}
```

## Here's the list of available nested routes:

* https://jsonplaceholder.typicode.com/posts/1/comments 
```
{
  comments(postId: 1) {
    postId
    id
    name
    email
    body
  }
}
```

* (also experiment tunneling down into post and user, revealing the possibilities via a GraphQL Api...)
```
{
  comments(postId: 1) {
    postId
    post {
      title
      user {
        name
      }
    }
    id
    name
    email
    body
  }
}
```

* https://jsonplaceholder.typicode.com/albums/1/photos
```
{
  photos(albumId:1){
    albumId
    id
    title
    url
    thumbnailUrl
  }  
}
```

* https://jsonplaceholder.typicode.com/users/1/albums
```
{
  albums(userId: 1) {
    userId
    id
    title
  }
}
```

* https://jsonplaceholder.typicode.com/users/1/todos
```
{
  todos(userId: 1) {
    userId
    id
    title
    completed
  }
}
```
* (Experiment with completed criteria and accessing the User data as well, GraphQL good stuff)
```
{
  todos(userId: 1,completed:true) {
    user{
      name
    }
    id
    title
    completed
  }
}
```

* https://jsonplaceholder.typicode.com/users/1/posts
```
{
  posts(userId: 1) {
    userId
    id
    title
    body
  }
}
```

## //TODO
This is intended to be an available Sandbox and learning tool, built off of the existing awesome learning tool, JSON Placeholder. Improvements would be to:
* Add front end to support an ad, to bump up the Heroku service level from the free tier
* Embed the GraphiQL ui in an iframe into the front end. 
* Inject sample queries via frontend UI
* More Examples, along the lines of: https://www.howtographql.com/advanced/2-more-graphql-concepts/
* Implement the POST, PUT, PATCH, DELETE Restful API/ GraphQL mutations.
* Refactor the Schema into sub schemas

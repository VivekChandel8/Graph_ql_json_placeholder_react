const axios = require("axios");
const cors = require('cors')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");

const jhp = "https://jsonplaceholder.typicode.com/";

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    user: userGetter,
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    post: postGetter,
    postId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: () => ({
    user: userGetter,
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString }
  })
});

const PhotoType = new GraphQLObjectType({
  name: "Photo",
  fields: () => ({
    album: albumGetter,
    albumId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString }
  })
});

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    user: userGetter,
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString }
  })
});

//root query

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "posts/" + args.id).then(res => res.data);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        userId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        if (args.userId) {
          return axios
            .get(jhp + "posts?userId=" + args.userId)
            .then(res => res.data);
        } else {
          return axios.get(jhp + "posts").then(res => res.data);
        }
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "comments/" + args.id).then(res => res.data);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        postId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        if (args.postId) {
          return axios
            .get(jhp + "comments?postId=" + args.postId)
            .then(res => res.data);
        } else {
          return axios.get(jhp + "comments").then(res => res.data);
        }
      }
    },
    album: {
      type: AlbumType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "albums/" + args.id).then(res => res.data);
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      args: {
        userId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        if (args.userId) {
          return axios
            .get(jhp + "albums?userId=" + args.userId)
            .then(res => res.data);
        } else {
          return axios.get(jhp + "albums").then(res => res.data);
        }
      }
    },
    photo: {
      type: PhotoType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "photos/" + args.id).then(res => res.data);
      }
    },
    photos: {
      type: new GraphQLList(PhotoType),
      args: {
        albumId: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        if (args.albumId) {
          return axios
            .get(jhp + "photos?albumId=" + args.albumId)
            .then(res => res.data);
        } else {
          return axios.get(jhp + "photos").then(res => res.data);
        }
      }
    },
    todo: {
      type: TodoType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "todos/" + args.id).then(res => res.data);
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      args: {
        userId: {
          type: GraphQLInt
        },
        completed: {
          type: GraphQLBoolean
        }
      },
      resolve(parentValue, args) {
        let argsString = "";
        let idSet = typeof args.userId !== "undefined";
        let compSet = typeof args.completed !== "undefined";
        //todos?userId=3&completed=true
        if (idSet && !compSet) {
          argsString = "?userId=" + args.userId;
        }

        if (!idSet && compSet) {
          argsString = "?completed=" + args.completed;
        }

        if (idSet && compSet) {
          argsString =
            "?userId=" + args.userId + "&completed=" + args.completed;
        }
        //ready to feel stupid when I think of a smarter way...
        return axios.get(jhp + "todos" + argsString).then(res => res.data);
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return axios.get(jhp + "users/" + args.id).then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(jhp + "users").then(res => res.data);
      }
    }
  }
});

const userGetter = {
  type: UserType,
  resolve(parent, args) {
    return axios.get(jhp + "users/" + parent.userId).then(res => res.data);
  }
};

const postGetter = {
  type: PostType,
  resolve(parent, args) {
    return axios.get(jhp + "posts/" + parent.postId).then(res => res.data);
  }
};

const albumGetter = {
  type: AlbumType,
  resolve(parent, args) {
    return axios.get(jhp + "albums/" + parent.albumId).then(res => res.data);
  }
};

module.exports = new GraphQLSchema({
  query: RootQuery
});

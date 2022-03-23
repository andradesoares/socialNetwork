const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  Post: {
    likeCount: (parentValue) => {
      return parentValue.likes.length;
    },
    commentCount: (parentValue) => {
      return parentValue.comments.length;
    },
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};

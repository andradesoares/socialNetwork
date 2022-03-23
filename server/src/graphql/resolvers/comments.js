const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const auth = require('../../utils/auth');

module.exports = {
  Mutation: {
    createComment: async (parentValue, args, context) => {
      const user = auth(context);
      const { postId, body } = args;

      try {
        if (body.trim() === '') {
          throw new UserInputError('Empty comment', {
            errors: {
              body: 'Comment body must not be empty',
            },
          });
        }

        const post = await Post.findById(postId);

        if (!post) {
          throw new UserInputError('Post not found');
        }

        post.comments.unshift({
          body,
          userName: user.userName,
          createdAt: new Date().toISOString(),
        });
        await post.save();

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteComment: async (parentValue, args, context) => {
      const user = auth(context);
      const { postId, commentId } = args;

      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new UserInputError('Post not found');
        }

        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].userName !== user.userName) {
          throw new AuthenticationError('Action not allowed');
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        return post;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};

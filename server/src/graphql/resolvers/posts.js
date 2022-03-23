const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const auth = require('../../utils/auth');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (parentValue, args) => {
      const { postId } = args;
      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('Post not found');
        }

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (parentValue, args, context) => {
      const user = auth(context);
      const { body } = args;

      try {
        if (body.trim() === '') {
          throw new Error('Post body must not be empty');
        }

        const newPost = new Post({
          body,
          user: user.id,
          userName: user.userName,
          createdAt: new Date().toISOString(),
        });
        const post = await newPost.save();

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    deletePost: async (parentValue, args, context) => {
      const user = auth(context);
      const { postId } = args;

      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('Post not found');
        }

        if (user.userName !== post.userName) {
          throw new AuthenticationError('Action not allowed');
        }

        await post.delete();
        return 'Post deleted successfully';
      } catch (error) {
        throw new Error(error);
      }
    },
    likePost: async (parentValue, args, context) => {
      const user = auth(context);
      const { postId } = args;

      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('Post not found');
        }

        if (post.likes.find((like) => like.userName === user.userName)) {
          post.likes = post.likes.filter((like) => like.userName !== user.userName);
        } else {
          post.likes.push({
            userName: user.userName,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();

        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    userName: String!
    email: String!
    token: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }
  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(input: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;

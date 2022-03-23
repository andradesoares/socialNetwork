import { gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      userName
      createdAt
      likes {
        id
        userName
        createdAt
      }
      likeCount
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
    }
  }
`;

export default CREATE_POST;

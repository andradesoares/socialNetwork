import { gql } from '@apollo/client';

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
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

export default CREATE_COMMENT;

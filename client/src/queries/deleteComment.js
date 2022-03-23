import { gql } from '@apollo/client';

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        userName
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DELETE_COMMENT;

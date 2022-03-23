import { gql } from '@apollo/client';

const LIKE_POST = gql`
  mutation likePost($id: ID!) {
    likePost(postId: $id) {
      id
      likes {
        id
        userName
      }
      likeCount
    }
  }
`;

export default LIKE_POST;

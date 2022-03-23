import { gql } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DELETE_POST;

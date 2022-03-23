import { gql } from '@apollo/client';

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userName
      }
      commentCount
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

export default FETCH_POSTS;

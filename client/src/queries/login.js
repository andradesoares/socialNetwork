import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

export default LOGIN_USER;

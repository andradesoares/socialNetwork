import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../PostCard';
import PostForm from '../PostForm';

import FETCH_POSTS from '../../queries/fetchPosts';
import { AuthContext } from '../../context/auth';

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS);

  const { user } = useContext(AuthContext);

  if (error) return <p>Error :</p>;

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Transition.Group>
            {data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;

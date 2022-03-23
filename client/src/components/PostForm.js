import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Form, FormField, FormInput, Button } from 'semantic-ui-react';

import CREATE_POST from '../queries/createPost';
import FETCH_POSTS from '../queries/fetchPosts';

const PostForm = () => {
  const [body, setBody] = useState('');

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: { body },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          ...data,
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      setBody('');
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  const onChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <FormField>
          <FormInput
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Post
          </Button>
        </FormField>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;

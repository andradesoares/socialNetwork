import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react';

import DELETE_POST from '../queries/deletePost';
import DELETE_COMMENT from '../queries/deleteComment';
import FETCH_POSTS from '../queries/fetchPosts';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });

        proxy.writeQuery({
          query: FETCH_POSTS,
          data: { ...data, getPosts: data.getPosts.filter((post) => post.id !== postId) },
        });
      }

      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Popup
        content={commentId ? 'Delete Comment' : 'Delete Post'}
        inverted
        trigger={
          <Button as="div" floated="right" color="red" onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;

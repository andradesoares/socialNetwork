import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';

import LIKE_POST from '../queries/likePost';

const LikeButton = ({ post, user }) => {
  const { id, likeCount, likes } = post;

  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, { variables: { id } });

  useEffect(() => {
    if (user && likes.find((like) => like.userName === user.userName)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/signin">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;

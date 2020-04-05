import React from 'react';

import Card from '../components/Card';
import Form from '../components/Form';

export const PostList = ({ posts, createPost, tipedPost }) => {
  console.log(posts);
  return (
    <div className="container my-4 py-4">
      <Form createPost={createPost} />
      {
        posts.map((post, idx) => {
          return (
            <Card {...post} key={idx} tipedPost={tipedPost}/>
          )
        })
      }
    </div>
  );
};

export default PostList;

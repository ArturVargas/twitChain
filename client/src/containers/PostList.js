import React from 'react';

import Card from '../components/Card';
import Form from '../components/Form';

export const PostList = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container my-4 py-4">
      <Form />
      {
        posts.map((post, idx) => {
          return (
            <Card {...post} key={idx} />
          )
        })
      }
    </div>
  );
};

export default PostList;

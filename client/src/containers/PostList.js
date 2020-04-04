import React from 'react';

import Card from '../components/Card';

export const PostList = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container my-4 py-4">
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

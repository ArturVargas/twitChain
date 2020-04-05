import React from 'react';

import Avatar from './Avatar';

const Card = ({id, author, content, tipAmount, tipedPost}) => (
  <React.Fragment>
    <div className="card my-4">
      <div className="card-header">
        <Avatar userAddress={author} />
        <small className="text-muted">{author}</small>
      </div>
      <div className="card-body">
        <h5 className="card-title">{content}</h5>
        <button
          className="btn btn-primary"
          name={id}
          onClick={(e) => {
            tipedPost(e.target.name, '0000000000001')  
          }}
        >
          Give a Tip
        </button>
      </div>
      <div className="card-footer">
        Tips Amount: {tipAmount} ETH
      </div>
    </div>
  </React.Fragment>
);

export default Card;

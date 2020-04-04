import React from 'react';
import Identicon from 'identicon.js';

const Card = ({author, content, tipAmount}) => (
  <React.Fragment>
    <div className="card my-4">
      <div className="card-header">
        <img className="mr-2" width="30" height="30" src={`data:image/png;base64,${new Identicon(author, 30).toString()}`} />
        <small className="text-muted">{author}</small>
      </div>
      <div className="card-body">
        <h5 className="card-title">{content}</h5>
        <a href="/" className="btn btn-primary">Give a Tip</a>
      </div>
      <div className="card-footer">
        Tips Amount: {tipAmount}
      </div>
    </div>
  </React.Fragment>
);

export default Card;

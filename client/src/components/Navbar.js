import React from 'react';

export const Navbar = ({ account }) => (
  <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Twitter.png" width="50" height="auto" className="d-inline-block align-top" alt="" />
          TwitChain
      </a>
      <div className="media">
        <span className="my-2 my-sm-0 font-weight-bolder text-white">
          {account}
        </span>
        
      </div>
    </nav>
  </React.Fragment>
);

export default Navbar;

import React from 'react';

import Avatar from './Avatar';

export const Navbar = ({ account }) => (
  <React.Fragment>
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Twitter.png" width="50" height="auto" className="d-inline-block align-top" alt="" />
          TwitChain
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <span className="font-weight-bolder text-white mr-2">
              {account}
            </span>
            {
              account && (
                <Avatar userAddress={account}/>
              )
            }
          </li>

        </ul>
      </div>
    </nav>
  </React.Fragment>
);

export default Navbar;

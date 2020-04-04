import React from 'react';

const Spinner = () => (
  <div className="d-flex justify-content-center my-5 pt-5">
    <div className="spinner-grow text-info" style={{ width: '4rem', height: '4rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
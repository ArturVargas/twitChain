import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="mt-5 col-7">
        <form onSubmit={(event) => {
          event.preventDefault();
          const content = this.postContent.value
          this.props.createPost(content);
        }}>
          <div className="form-group">
            <input
              id="postContent"
              type="text"
              ref={ (input) => { this.postContent = input}}
              className="form-control"
              aria-describedby="contentInput"
              placeholder="Que estas Pensando...?"
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
          >
            Publicar
          </button>
        </form>
      </div>
    )
  }
};

export default Form;
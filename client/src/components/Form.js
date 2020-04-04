import React from 'react';

const Form = (twitChain) => {

  return (
    <div className="mt-5 col-7">
      <form>
        <div className="form-group">
          <input type="email" className="form-control" aria-describedby="contentInput" placeholder="Que estas Pensando...?" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Publicar</button>
      </form>
    </div>
  )

};

export default Form;
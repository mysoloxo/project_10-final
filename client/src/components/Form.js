import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;
  //creating the handleSubmit function 
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }
  //creating the handlecancel function 
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      {/* rendering the error handlers container */}
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button logIn" type="submit">{submitButtonText}</button>
          <button className="button button-secondary logIn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

//creating the errordisplay function for form validation errors
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            <li>{errors}</li>
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

 import React from 'react';


 //This stateless component ensures that all the inputs in the form accross the application is validated.
 //If not, and there are errors, it will render the errors.
const ValidationForm = (props) => {
    const {cancel, errors, submit, submitButtonText, elements} = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        submit()
    }
    const handleCancel  = (event) => {
        event.preventDefault();
        cancel();
    }

    function ErrorsDisplay({ errors }) {
      let errorsDisplay = null;

      if (errors.length) {
        errorsDisplay = (
          <div>
            <h2 className='validation--errors--label'>Validation errors</h2>
            <div className='validation-errors'>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      return errorsDisplay;
    }
return (
  <div>
    <ErrorsDisplay errors={errors} />
    <form onSubmit={handleSubmit}>
      {elements()}
      <div className='pad-bottom'>
        <button className='button' type='submit'>
          {submitButtonText}
        </button>
        <button className='button button-secondary' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
);
}

export default ValidationForm;

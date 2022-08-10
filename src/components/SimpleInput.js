import useInput from "../hooks/use-input";

const validateEmail = (email) => {
  return (
    // email.trim() !== "" &&
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};

const validateName = (name) => {
  return name.trim() !== "";
};

const SimpleInput = (props) => {
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput(validateName);
  const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput(validateEmail);

  let formIsValid = false;

  if (nameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(nameInputValue, emailInputValue);

    nameInputReset();
    emailInputReset();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameInputChangeHandler}
          type="text"
          id="name"
          value={nameInputValue}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          onChange={emailInputChangeHandler}
          type="email"
          id="email"
          value={emailInputValue}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Email is not valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

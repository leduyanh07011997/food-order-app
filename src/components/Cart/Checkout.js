import { useRef, useState } from "react";
import "./Checkout.scss";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    nameIsValid: true,
    emailIsValid: true,
    phoNumberIsValid: true,
    addressIsValid: true,
    formIsValid: true,
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const addressInputRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  };
  const isFiveChars = (value) => value.trim().length >= 5;
  const isPhoneNumber = (value) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const emailIsValid = isEmail(enteredEmail);
    const phoNumberIsValid = isPhoneNumber(enteredPhoneNumber);
    const addressIsValid = isFiveChars(enteredAddress);
    const formIsValid =
      nameIsValid && emailIsValid && phoNumberIsValid && addressIsValid;

    setFormInputValidity({
      nameIsValid,
      emailIsValid,
      phoNumberIsValid,
      addressIsValid,
      formIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onCheckout({
      userName: enteredName,
      email: enteredEmail,
      phoNumber: enteredPhoneNumber,
      address: enteredAddress,
    });
  };

  const nameFormClasses = `control ${
    !formInputValidity.nameIsValid ? "invalid" : ""
  }`;
  const emailFormClasses = `control ${
    !formInputValidity.emailIsValid ? "invalid" : ""
  }`;
  const phoNumberFormClasses = `control ${
    !formInputValidity.phoNumberIsValid ? "invalid" : ""
  }`;
  const addressFormClasses = `control ${
    !formInputValidity.addressIsValid ? "invalid" : ""
  }`;

  return (
    <form className="formCheckout" onSubmit={submitForm}>
      <div className={nameFormClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputValidity.nameIsValid && (
          <p className="error-text">The name must not empty!</p>
        )}
      </div>
      <div className={emailFormClasses}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef}></input>
        {!formInputValidity.emailIsValid && (
          <p className="error-text">The email is incorrect!</p>
        )}
      </div>
      <div className={phoNumberFormClasses}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" ref={phoneNumberInputRef}></input>
        {!formInputValidity.phoNumberIsValid && (
          <p className="error-text">The phone number is incorrect!</p>
        )}
      </div>
      <div className={addressFormClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef}></input>
        {!formInputValidity.addressIsValid && (
          <p className="error-text">The address must at least 5 characters!</p>
        )}
      </div>
      <div className="actionsCheckout">
        <button className="btn buttonClose" onClick={props.onHideCart}>
          Cancel
        </button>
        <button
          // disabled={!formInputValidity.formIsValid}
          className="btn buttonConfirm"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

import "./Cart.scss";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItemInCart = cartCtx.items.length > 0;

  const handleRemoveItemFromCart = (id) => {
    cartCtx.removeItem(id);
  };

  const handleAddItemToCart = (item) => {
    cartCtx.addItem(item);
  };

  const checkoutHandle = () => {
    setIsCheckout(true);
  };

  const submitOrderHandle = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://foody-app-df9a0-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          meals: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={handleRemoveItemFromCart.bind(null, item.id)}
          onAdd={handleAddItemToCart.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={props.onHideCart}>
        Close
      </button>
      {hasItemInCart && (
        <button className="button" onClick={checkoutHandle}>
          Order
        </button>
      )}
    </div>
  );

  const submittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className="actions">
        <button className="button" onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className="total">
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCheckout={submitOrderHandle}
          onHideCart={props.onHideCart}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

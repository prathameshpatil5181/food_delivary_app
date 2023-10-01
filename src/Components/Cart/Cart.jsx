import classes from "./Cart.module.css";
import { useContext, useState, Fragment } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Model from "../UI/Model";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.item.length > 0;
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);



  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const CartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const handleShowOrder = () => {
    setShowForm(true);
  }
  const closeShowOrder = () => {
    setShowForm(false);
  }

  const SubmitOrderCartHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://fooddelivaryapp-7834d-default-rtdb.firebaseio.com/Orders.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userData,
        orderedItem: cartCtx.item,
      })

    })
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null, item.id)}
          onAdd={CartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = <Fragment>
    {cartItem}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={handleShowOrder}>Order</button>}
    </div>
    {showForm ?
      <div>
        <Checkout onConfirm={SubmitOrderCartHandler} onCancel={closeShowOrder} />
      </div> : ''}
  </Fragment>


const isSubmittingModalContent = <p>Sending the Order data....</p>;

const didSubmitModalContent = <Fragment>
  <p>Successully sent the order!</p> 
  <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>
      Close
    </button>
  </div>
  </Fragment>;

return (
  <Model onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Model>

);
};
export default Cart;

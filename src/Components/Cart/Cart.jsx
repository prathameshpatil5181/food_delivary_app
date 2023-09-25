import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Model from "../UI/Model";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.item.length > 0;

  const CartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const CartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {CartItemRemoveHandler.bind(null,item.id)}
          onAdd = {CartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onClose}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};
export default Cart;

import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exitstingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.item[exitstingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.item];
      updatedItems[exitstingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }
    

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.item[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.item.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {

    return defaultCartState;

  }


  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItmeFromController = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = ()=>{
    dispatchCartAction({
      type:"CLEAR"
    })
  }
  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItmeFromController,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

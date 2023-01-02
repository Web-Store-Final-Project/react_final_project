import { React, useState } from "react";
import ItemDetailsCart from "../../components/itemDetailsCart";

export default function Cart(props) {
  return (
    <div className="cart">
      <div className="items">
        {props.cart &&
          props.cart.map((item) => (
            <ItemDetailsCart
              isLoggedIn={props.isLoggedIn}
              amountInCart={props.amountInCart}
              setAmountInCart={props.setAmountInCart}
              item={item}
              key={item._id}
              cart={props.cart}
              setCart={props.setCart}
            />
          ))}
      </div>
    </div>
  );
}

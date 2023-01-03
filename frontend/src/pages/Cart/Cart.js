import { React } from "react";
import ItemDetailsCart from "../../components/itemDetailsCart";
import NotAuthorized from '../NotAuthorized/NotAuthorized';
export default function Cart(props) {
  return (
    <>
    {
       !props.isLoggedIn && (
          <NotAuthorized/>
        )
    }
    <div className="cart">
      <div className="items">
        {
          props.isLoggedIn && props.cart &&
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
    </>
  );
}

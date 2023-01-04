import { React } from "react";
import ItemDetailsCart from "../Cart/components/itemDetailsCart";
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import CartOrder from './components/CartOrder';
export default function Cart(props) {
  return (
    <>
    {
       !props.isLoggedIn && (
          <NotAuthorized/>
        )
    }
    <div className="result">
     <CartOrder email={props.email} cart={props.cart}/>
    </div>
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

import { React,useState } from "react";
import ItemDetailsCart from "../../components/itemDetailsCart";
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import CartOrder from '../../components/CartOrder';
export default function Cart(props) {
  
  const [total,setTotal] = useState(0);
  
  return (
    <>
    {
       !props.isLoggedIn && (
          <NotAuthorized/>
        )
    }
    <div className="result">
     <CartOrder cart = {props.cart} total={total} setTotal={setTotal}/>
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

import { useItemsContext } from "../hooks/useItemsContext";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ItemDetails = (props) => {
  const { dispatch } = useItemsContext();
  const addToCart = () => {
    const cartArray = Object.values(props.cart);
    props.setCart((prev) => {
      return [...cartArray, props.item];
    });
    props.setAmountInCart(cartArray.length);
    console.log(props.cart);
    console.log(props.amountInCart);
  };
  const handleClick = async () => {
    const response = await fetch("/api/items/" + props.item._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
    }
  };

  return (
    <div className="item-details">
      <h4>{props.item.title}</h4>
      <p>
        <strong>Brand: </strong>
        {props.item.brand}
      </p>
      <p>
        <strong>Price: </strong>
        {props.item.price}$
      </p>
      <img className="imgItem" src={props.item.imgPath1} alt=""></img>
      <img className="imgItem" src={props.item.imgPath2} alt=""></img>
      {/* <p>
        uploaded{" "}
        {formatDistanceToNow(new Date(props.item.createdAt), {
          addSuffix: true,
        })}
      </p> */}
      {/* {props.isLoggedIn && <button onClick={addToCart}>Add To Cart</button>} */}
      {props.isAdmin && (
        <span onClick={handleClick}>
          <img
            className="deleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/216/216760.png"
            alt=""
          ></img>
        </span>
      )}
      {!props.isAdmin && props.isLoggedIn && (
        <span onClick={addToCart}>
          <img
            className="addToCartIcon"
            src="https://cdn-icons-png.flaticon.com/512/3405/3405668.png"
            alt=""
          ></img>
        </span>
      )}
      {!props.isAdmin && props.isLoggedIn && props.isInCart && (
        <span onClick={addToCart}>
          <img
            className="addToCartIcon"
            src="https://cdn-icons-png.flaticon.com/512/3405/3405668.png"
            alt=""
          ></img>
        </span>
      )}
    </div>
  );
};

export default ItemDetails;

import { useItemsContext } from "../../../hooks/useItemsContext";

const ItemDetails = (props) => {
  const { dispatch } = useItemsContext();

  const addToCart = () => {
    const cartArray = Object.values(props.cart);
    props.setCart((prev) => {
      return [...cartArray, props.item];
    });
    props.setAmountInCart(props.amountInCart + 1);
    console.log(props.cart);
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
      <div className="item-details-info">
        <p>
          <strong>Brand: </strong>
          {props.item.brand}
        </p>
        <p>
          <strong>Price: </strong>
          {props.item.price}$
        </p>
      </div>
      <div className="item-details-imgs">
        <img className="imgItem" src={props.item.imgPath1} alt=""></img>
        <img className="imgItem" src={props.item.imgPath2} alt=""></img>
      </div>
      {props.isAdmin && (
        <>
          <span onClick={handleClick} className="itemClickIcon">
            <img
              className="deleteIcon"
              src="https://cdn-icons-png.flaticon.com/512/216/216760.png"
              alt=""
            ></img>
          </span>
          <div className="hide">Delete item from DB</div>
        </>
      )}
      {!props.isAdmin && props.isLoggedIn && (
        <>
          <span onClick={addToCart} className="itemClickIcon">
            <img
              className="addToCartIcon"
              src="https://cdn-icons-png.flaticon.com/512/3405/3405668.png"
              alt=""
            ></img>
          </span>
          <div className="hide">Add item to cart</div>
        </>
      )}
    </div>
  );
};

export default ItemDetails;

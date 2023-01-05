const ItemDetailsCart = (props) => {
  const removeFromCart = () => {
    const cartArray = Object.values(props.cart);
    const index = cartArray.indexOf(props.item);
    cartArray.splice(index, 1);
    props.setCart((prev) => {
      return [...cartArray];
    });
    props.setAmountInCart(cartArray.length);
    console.log(props.cart);
    console.log(props.amountInCart);
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
      {/* <p>
        uploaded{" "}
        {formatDistanceToNow(new Date(props.item.createdAt), {
          addSuffix: true,
        })}
      </p> */}
      {/* {props.isLoggedIn && <button onClick={addToCart}>Add To Cart</button>} */}
      {!props.isAdmin && props.isLoggedIn && (
        <span onClick={removeFromCart} className="itemClickIcon">
          <img
            className="deleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/216/216760.png"
            alt=""
          ></img>
        </span>
      )}
      <div className="hide">Remove item from cart</div>
    </div>
  );
};

export default ItemDetailsCart;

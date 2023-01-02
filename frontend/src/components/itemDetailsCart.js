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
      <p>
        <strong>Description: </strong>
        {props.item.description}
      </p>
      <p>
        <strong>Price: </strong>
        {props.item.price}$
      </p>
      <img className="imgItem" src={props.item.imgPath} alt=""></img>
      {/* <p>
        uploaded{" "}
        {formatDistanceToNow(new Date(props.item.createdAt), {
          addSuffix: true,
        })}
      </p> */}
      {/* {props.isLoggedIn && <button onClick={addToCart}>Add To Cart</button>} */}
      {!props.isAdmin && props.isLoggedIn && (
        <span onClick={removeFromCart}>
          <img
            className="deleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/216/216760.png"
            alt=""
          ></img>
        </span>
      )}
    </div>
  );
};

export default ItemDetailsCart;

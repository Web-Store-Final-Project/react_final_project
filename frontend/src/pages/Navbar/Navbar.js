import { Link } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "./components/LoginIcon";

const Navbar = (props) => {
  return (
    <>
      <header>
        <div className="container">
          {!props.isAdmin && (
            <Link to={"/"}>
              <HomeIcon fontSize="large" />
            </Link>
          )}

          {props.isAdmin && props.isLoggedIn && (
            <>
              <Link to={"/admin"}>
                <h2>Admin Page</h2>
              </Link>
              <Link to={"/adminManagement"}>
                <h2>Dashboard</h2>
              </Link>
              <Link to={"/"}>
                <h2
                    onClick={() => {
                    const requestOptions = {
                    method: 'POST',
                    crossDomain: true,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email: props.email, isOnline:false})
                  };
                  console.log("worked");
                  fetch(`/api/users/setOnlineStatus`, requestOptions)
                  .then(response => response.json())
                  .then(data => {
                    props.setIsLoggedIn(false);
                    props.setIsAdmin(false);
                    props.setCart([]);
                    props.setAmountInCart(0);
                  }).catch(e=>{
                    console.log(e)
                  })
                    }}
                >
                  Log-Out
                </h2>
              </Link>
            </>
          )}

          {!props.isLoggedIn && (
            <>
              <Link to={"/signin"} style={{ paddingLeft: "55%" }}>
                <LoginIcon />
              </Link>
            </>
          )}
          {props.isLoggedIn && !props.isAdmin && (
            <>
              <Link to={`/${props.email}`}>
                <h2>Profile</h2>
              </Link>
              <Link to={"/cart"} style={{ paddingRight: "5%" }}>
                <ShoppingCart amountInCart={props.amountInCart} />
              </Link>
              <Link to={"/"}>
                <h2
                  onClick={() => {
                    const requestOptions = {
                    method: 'POST',
                    crossDomain: true,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email: props.email, isOnline:false})
                  };
                  console.log("worked");
                  fetch(`/api/users/setOnlineStatus`, requestOptions)
                  .then(response => response.json())
                  .then(data => {
                    props.setIsLoggedIn(false);
                    props.setAmountInCart(0);
                  }).catch(e=>{
                    console.log(e)
                  })
                }}
                >
                  Log-Out
                </h2>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;

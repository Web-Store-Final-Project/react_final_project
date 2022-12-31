import {useEffect} from 'react'
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "./LoginIcon";

const Navbar = (props) => {
  useEffect(()=>{
      console.log(props)
  },[])
  return (
    <>
    <header>
      <div className="container">
        <Link to={"/"} amountInCart={props.amountInCart} setAmountInCart={props.setAmountInCart}>
          <HomeIcon fontSize="large" />
        </Link>
        { props.isAdmin && props.isLoggedIn &&(
          <>
          <Link to={"/admin"}>
            <h2>Admin Page</h2>
          </Link>
          <Link to={"/"}>
              <h2 onClick={()=>{
                  props.setIsLoggedIn(false);
                  props.setIsAdmin(false);
                }
            }>Log-Out</h2>
          </Link>
          </>
        )
        }
        
        { !props.isLoggedIn && (
            <>
              <Link to={"/signin"} style={{ paddingLeft: "55%" }}>
                <LoginIcon />
              </Link>
            </>
          )
        }
        {
          props.isLoggedIn && !props.isAdmin && (
            <>
            <div style={{ paddingRight: "5%" }}>
              <ShoppingCart amountInCart={props.amountInCart} setAmountInCart={props.setAmountInCart} />
            </div>
            <Link to={"/"}>
              <h2 onClick={()=>props.setIsLoggedIn(false)}>Log-Out</h2>
            </Link>
            </>
          )
        }        
      
      </div>
    </header>
    </>
  );
};

export default Navbar;

import {useEffect} from 'react'
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "./LoginIcon";

const Navbar = (props) => {
  return (
    <>
    <header>
      <div className="container">
        <Link to={"/"}>
          <HomeIcon fontSize="large" />
        </Link>
        { props.isAdmin && props.isLoggedIn &&(
          <Link to={"/admin"}>
            <h2>Admin Page</h2>
          </Link>
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
            <div style={{ paddingRight: "5%" }}>
              <ShoppingCart />
            </div>
          )
        }        

      </div>
    </header>
    </>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "./LoginIcon";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <HomeIcon fontSize="large" />
        </Link>
        <Link to={"/admin"}>
          <h2>Admin Page</h2>
        </Link>
        <Link to={"/signin"} style={{ paddingLeft: "55%" }}>
          <LoginIcon />
        </Link>
        <div style={{ paddingRight: "5%" }}>
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

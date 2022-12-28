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
        <Link to={"/admin"} style={{ paddingLeft: "20px" }}>
          <h2>Admin Page</h2>
        </Link>
        <Link to={"/signin"} style={{ paddingLeft: "900px" }}>
          <LoginIcon />
        </Link>
        <div style={{ paddingRight: "50px" }}>
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

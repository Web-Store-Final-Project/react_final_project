import { Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Home Page </h1>
        </Link>
        { 
          props.isAdmin &&
          <Link to={"/admin"}>
            <h1>Admin Page</h1>
          </Link>
        }
        <Link to={"/signin"}>
          <h1>Log-In</h1>
        </Link>
        {/* <Link to={"/signup"}>
          <h1>Sign-Up </h1>
        </Link> */}
      </div>
    </header>
  );
};

export default Navbar;

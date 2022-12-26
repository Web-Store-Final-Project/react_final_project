import { Link } from "react-router-dom";
const Navbar = ()=>{
    return(
      <header>
        <div className="container">
            <Link to={"/"}>
                <h1>Admin Page </h1>
            </Link>
            <Link to={"/signin"}>
                <h1>Sign-In</h1>
            </Link>
            <Link to={"/signup"}>
                <h1>Sign-Up </h1>
            </Link>
        </div>
      </header> 
    );
}

export default Navbar
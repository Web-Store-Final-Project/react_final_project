import { Link } from "react-router-dom";
const NavbarComp = ()=>{
    return(
      <header>
        <div className="container">
            <Link to={"/"}>
                <h1>Let The Fins Out </h1>
            </Link>
        </div>
      </header> 
    );
}

export default NavbarComp
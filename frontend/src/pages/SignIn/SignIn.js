import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import fire from "../../config/firebase-config";
import { Link } from "react-router-dom";
import SignUpIcon from './components/SignUpIcon';
export default function Signin(props) {
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();
    const login = (e) => {
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(email, password).then((user)=>{
      const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email,isOnline: true})
      };
      fetch('/api/users/setOnlineStatus', requestOptions)
      .then(response => response.json())
      .then((data) => {
      if (email === "Admin123@gmail.com"){
        props.setIsAdmin(true)
        props.setIsLoggedIn(true)
        props.setEmail(email);
        navigate("/admin");
      }
      else{
        props.setIsLoggedIn(true)
        props.setEmail(email);
        navigate("/")
      };
    })
  })
    .catch((err)=>{
      console.log(err);
      setError("Email or password is incorrect. Please try again.");
    })
  }
  return (
    <div>
      <h1>Sign-In</h1>
      <form>
        <div>
          <label>Enter email </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Enter password </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={login}>Click to sign-in</button>
      </form>
      <h4>{error}</h4>
      <div style={{ paddingTop: "0px" }}>
        <Link to={"/signup"}>
          <SignUpIcon />
        </Link>
      </div>
    </div>
    ) 
  } 
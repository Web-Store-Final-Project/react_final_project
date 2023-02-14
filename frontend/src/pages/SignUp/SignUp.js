import {React, useState} from 'react'
import {useNavigate} from "react-router-dom"
import fire from '../../config/firebase-config';

export default function SignUp(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const [fullname,setFullName] = useState(""); 
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const signup = (e) =>{
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
      console.log(user);
      const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({fullname: fullname, email: email, password: password})
      };
      console.log("worked");
      fetch('/api/users/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
      navigate("/signin");
    }).catch((err)=>{
      console.log(err);
      setError("Email or password is incorrect. Please try again.");
    });
  }
  return (
    <div>
      <h1>sign-up</h1>
      <form>
        <div>
            <label>Enter Full Name </label>
            <input type="text" id="fullname" name="fullname"
            onChange={(e) => setFullName(e.target.value)}
            value={fullname}></input>
        </div>
        <div>
            <label>Enter email </label>
            <input type="email" id="email" name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}></input>
        </div>
        <div>
            <label>Enter password </label>
            <input type="password" id="password" name="password"
            onChange={(e) =>setPassword(e.target.value)}
            value={password}
            />
        </div>
        <button onClick={signup} >Click to sign-up</button>
      </form>
      <h4>{error}</h4>
    </div>
  )
}

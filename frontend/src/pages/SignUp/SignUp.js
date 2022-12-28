import {React, useState} from 'react'
import {useNavigate} from "react-router-dom"
import fire from '../../config/firebase-config';
export default function SignUp(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const navigate = useNavigate();
  const signup = (e) =>{
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
      console.log(user);
      navigate("/");
    }).catch((err)=>{
      console.log(err);
    });
  }
  return (
    <div>
      <h1>sign-up</h1>
      <form>
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
    </div>
  )
}

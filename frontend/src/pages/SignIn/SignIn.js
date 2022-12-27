import {React, useState} from 'react'
import fire from '../../config/firebase-config';
export default function Signin(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 
  const login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(email,password).then((user)=>{
      console.log(user);
    }).catch((err)=>{
      console.log(err);
    })
  } 
  return (
    <div>
      <h1>Sign-In</h1>
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
        <button onClick={login} >Click to sign-in</button>
      </form>
    </div>
  )
}

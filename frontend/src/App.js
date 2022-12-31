import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & components
import Home from "./pages/Home";
import AdminHome from "./pages/AdmimHome";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar";
import NotAuthorized from './pages/NotAuthorized/NotAuthorized';
import Profile from './pages/Profile/Profile';
function App() {
  const [email,setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [amountInCart, setAmountInCart] = useState(0);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar email={email} setEmail={setEmail} amountInCart={amountInCart} setAmountInCart={setAmountInCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <div className="pages">
          <Routes>
          {
            isAdmin && isLoggedIn && (
              <>
              <Route path="/admin" element={<AdminHome isAdmin={isAdmin} />} />
              <Route path="/signin" element={<NotAuthorized/>}/>
              <Route path="/logout"/>
              </>
            )
          }
          {
            isLoggedIn && !isAdmin && (
              <>
              <Route path={"/logout"}/>
              <Route path={`/${email}`} element={<Profile email={email}/>}/>
              <Route path="/signin" element={<NotAuthorized/>}/>
              </>
            )
          }
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} amountInCart={amountInCart} setAmountInCart={setAmountInCart} />} />
            <Route path="/admin" element={<NotAuthorized/>}/>
          {
            !isLoggedIn && (
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn email={email} setEmail={setEmail} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
              </>
            )
          }  
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

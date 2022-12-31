import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & components
import Home from "./pages/Home";
import AdminHome from "./pages/AdmimHome";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar";
function App() {
  const [email,setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar email={email} setEmail={setEmail} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <div className="pages">
          <Routes>
          {
            isAdmin && isLoggedIn && (
              <>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/logout"/>
              </>
            )
          }
            <Route path="/" element={<Home />} />
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

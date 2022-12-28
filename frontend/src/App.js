import {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & components
import Home from "./pages/Home";
import AdminHome from "./pages/adminHome";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar";
function App() {
  const [email,setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${email}`);
      const user = await response.json();
      console.log(user)
      if (response.ok) {
          if (user[0].isAdmin){
            //console.log(user[0])
            setIsAdmin(true);
          }
      }
    };
    fetchUser();
  }, );
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn email={email} setEmail={setEmail} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

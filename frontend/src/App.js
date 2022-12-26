import { BrowserRouter,Routes,Route } from "react-router-dom";
//pages & components
import Home from "./pages/Home";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/signup"
              element={<SignUp/>}
            />
            <Route
              path="/signin"
              element={<SignIn/>}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
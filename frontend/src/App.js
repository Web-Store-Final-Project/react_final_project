import { BrowserRouter,Routes,Route } from "react-router-dom";

//pages & components
import Home from "./pages/Home";
import NavbarComp from "./components/NavbarComp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
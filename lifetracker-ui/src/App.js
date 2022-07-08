import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

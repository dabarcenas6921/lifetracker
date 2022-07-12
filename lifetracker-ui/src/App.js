import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Activity from "./components/Activity/Activity";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

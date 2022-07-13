import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Activity from "./components/Activity/Activity";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            ></Route>
            <Route path="/activity" element={<Activity />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

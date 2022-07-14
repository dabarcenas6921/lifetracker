import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Activity from "./components/Activity/Activity";
import { useState } from "react";
import Exercise, { AddExercise } from "./components/Exercise/Exercise";
import Nutrition from "./components/Nutrition/Nutrition";
import Sleep from "./components/Sleep/Sleep";

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route
              path="/register"
              element={<SignUp user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/activity"
              element={<Activity user={user} setUser={setUser} />}
            ></Route>
            <Route path="/exercise" element={<Exercise user={user} />}></Route>
            <Route
              path="/nutrition"
              element={<Nutrition user={user} />}
            ></Route>
            <Route path="/sleep" element={<Sleep user={user} />}></Route>
            <Route path="/addExercise" element={<AddExercise />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

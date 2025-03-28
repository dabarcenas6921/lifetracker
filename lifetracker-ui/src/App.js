import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Activity from "./components/Activity/Activity";
import { useState, useEffect } from "react";
import Exercise, { AddExercise } from "./components/Exercise/Exercise";
import Nutrition, { AddNutrition } from "./components/Nutrition/Nutrition";
import Sleep, { AddSleep } from "./components/Sleep/Sleep";
import apiClient from "./services/apiClient";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAuthedUser = async () => {
      const data = await apiClient.getUser();
      if (data.data) {
        setIsLoggedIn(true);
        setUser(data.data.user);
      }
      // if (error) setError(error);
    };

    const token = localStorage.getItem("token");

    if (token) {
      apiClient.setToken(token);
      fetchAuthedUser();
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar
            user={user}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <SignUp
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/activity"
              element={
                <Activity
                  user={user}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/exercise"
              element={
                <Exercise
                  user={user}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/nutrition"
              element={
                <Nutrition
                  user={user}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/sleep"
              element={
                <Sleep
                  user={user}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/addExercise"
              element={<AddExercise user={user} />}
            ></Route>
            <Route
              path="/addNutrition"
              element={<AddNutrition user={user} />}
            ></Route>
            <Route path="/addSleep" element={<AddSleep user={user} />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Errorpage from './components/Errorpage'
import Logout from './components/Logout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialState, reducer } from './reducer/UseReducer'

// context api
export const UserContext = createContext();

export default function App() {

  // initialState and reducer are just variables
  // state = initialState
  // reducer ke pass action method hoti hai jab bhi dispatch ke dwara state change hoti hai to reducer action ke dwara state manage karta hai aur hamne state or dispatch har route ko de diya hai
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"*"} element={<Errorpage />} />
            <Route path={"/logout"} element={<Logout />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

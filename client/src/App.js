import React from "react";
import "./App.css";
import NavBar from './NavBar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Command from "./components/Command";
import Manage from "./components/Manage";
import Footer from "./Footer";
import Account from "./components/Account";

function App() {
  return (
      <Router>
          <NavBar/>
          <div className="background">
              <Routes>
                  <Route exact path="/home" element={<Home/>} />
                  <Route path="/command" element={<Command/>} />
                  <Route path="/manage" element={<Manage/>} />
                  <Route path="/account" element={<Account/>}/>
                  <Route path="/" element={<Navigate replace to="/home" />} />
              </Routes>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
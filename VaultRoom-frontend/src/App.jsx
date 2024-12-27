import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // Adjust path as per your project structure
import AuthPage from "./components/Login"; // Adjust path as per your project structure
import DashBoard from "./components/dashBoard"; 
import Home from "./components/home";
import PageNotFound from "./components/pageNotFound";
import {GoogleOAuthProvider} from "@react-oauth/google"

const App = () => {

    const GoogleAuthWrapper = ()=>{
      return(
        <GoogleOAuthProvider clientId="887155656525-3613njakpnq2lpnqkj6r65u7ccnkr3qo.apps.googleusercontent.com">
          <AuthPage></AuthPage>
        </GoogleOAuthProvider>
      )
    }

  return (
    <Router>
      <div className="min-h-screen bg-[#081229]">
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

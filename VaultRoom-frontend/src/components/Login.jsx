import React, { useState } from "react";
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import {useGoogleLogin} from "@react-oauth/google"

import "animate.css";
import { GoogleAuth } from "./Api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const responseGoogle = async (authResult)=>{
    try{
      if(authResult["code"]){
        console.log(authResult['code']);
        const result = await GoogleAuth(authResult.code);
        const {name , email , image} = result.data.user;
        console.log(result);
      }
      console.log(authResult);
    } catch(err){
      console.log('Error while login with google' , err);
    }
  }

  // Placeholder functions for OAuth buttons
  const handleGoogleLogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError : responseGoogle,
    flow : "auth-code",
  });

  const handleGithubLogin = () => {
    console.log("Login with GitHub clicked!");
    // Integrate GitHub OAuth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#081229] via-[#191d3a] to-[#081229] animate__animated animate__fadeIn animate__faster">
      <div className="bg-[#191d3a] p-8 rounded-lg shadow-lg w-full max-w-lg relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="40"
            height="40"
            className="mr-2"
          >
            <circle cx="100" cy="100" r="90" fill="#ec5990" stroke="#ffffff" strokeWidth="14" />
            <circle cx="100" cy="100" r="70" fill="white" stroke="#ec5990" strokeWidth="8" />
            <circle cx="100" cy="50" r="8" fill="#ec5990" />
            <circle cx="100" cy="150" r="8" fill="#ec5990" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="#ec5990" strokeWidth="8" />
            <line x1="100" y1="100" x2="100" y2="50" stroke="#ec5990" strokeWidth="6" />
            <line x1="100" y1="100" x2="50" y2="100" stroke="#ec5990" strokeWidth="6" />
            <line x1="100" y1="100" x2="150" y2="100" stroke="#ec5990" strokeWidth="6" />
            <line x1="100" y1="100" x2="100" y2="150" stroke="#ec5990" strokeWidth="6" />
          </svg>
          <h1 className="text-3xl font-bold text-white animate__animated animate__fadeIn animate__delay-1s">
            VaultRoom
          </h1>
        </div>

        {/* Forms Container */}
        <div className="relative overflow-hidden">
          {/* Login Form */}
          {isLogin ? (
            <div className="flex flex-col space-y-6 animate__animated animate__fadeInLeft animate__faster">
              <h2 className="text-xl text-white font-bold mb-4">Login</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] transition-all duration-300 hover:border-[#ec5990]"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] transition-all duration-300 hover:border-[#ec5990]"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
                >
                  <FaSignInAlt className="inline-block mr-2" />
                  Login
                </button>
              </form>

              {/* OAuth Buttons */}
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-all duration-300"
                >
                  <FcGoogle className="text-2xl mr-2" />
                  Continue with Google
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="flex items-center justify-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-all duration-300"
                >
                  <FaGithub className="text-2xl mr-2" />
                  Continue with GitHub
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 animate__animated animate__fadeInRight animate__faster">
              {/* Signup Form */}
              <h2 className="text-xl text-white font-bold mb-4">Sign Up</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] transition-all duration-300 hover:border-[#ec5990]"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] transition-all duration-300 hover:border-[#ec5990]"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] transition-all duration-300 hover:border-[#ec5990]"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
                >
                  <FaUserPlus className="inline-block mr-2" />
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Toggle Form Button */}
        <p className="text-center text-white mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-[#ec5990] hover:underline font-bold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

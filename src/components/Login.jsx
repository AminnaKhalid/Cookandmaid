import React from "react";
import video from "../assets/bg-video.mp4";
import logo from "../assets/logofull.png";
import email from "../assets/lock.png";
import password from "../assets/sms.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      {/* setting up the background video */}
      <div className="w-full min-h-screen relative">
        {/* one black layer with opacity */}
        <div className="overlay fixed object-cover z-0 h-[100%] w-[100%]">
          {/* video */}
          <video
            src={video}
            loop
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
        {/* all content of page */}
        <div className="w-full h-screen relative bg-black/50 z-2 flex items-center justify-center">
          {/* main container */}
          <div className="flex flex-col items-center justify-center gap-6 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
            {/* logo */}
            <div>
              <img src={logo} alt="Logo" className="w-[200px] md:w-[300px]" />
            </div>
            {/* main heading */}
            <div className="font-bold text-2xl md:text-4xl text-center w-full max-w-lg text-white">
              Expert Meal Preparation and Kitchen Care!!!
            </div>

            {/* Glassy Login Box */}
            <div className="mt-10 p-6 md:p-8 w-full max-w-lg rounded-3xl shadow-lg bg-white/10 backdrop-blur-xl backdrop-saturate-150 border border-white/30">
              {/* text section */}
              <div className="flex flex-col items-center text-2xl md:text-4xl font-semibold mb-4 text-white">
                <div>Welcome</div>
                <div className="text-sm text-gray-200">
                  Sign in with your email
                </div>
              </div>

              {/* input fields */}
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <img
                    src={email}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 opacity-80"
                    alt="Email Icon"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-10 py-2 rounded-lg bg-white text-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-black/70"
                    required
                  />
                </div>
                <div className="relative">
                  <img
                    src={password}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 opacity-80"
                    alt="Password Icon"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-10 py-2 rounded-lg bg-white text-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-black/70"
                    required
                  />
                </div>
                <Link to="/dashboard">
                  <button className="w-full bg-[#301820] text-white py-2 rounded-lg hover:bg-[#231015] transition">
                    Login
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

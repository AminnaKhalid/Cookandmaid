import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logotext.png";
import home from "../assets/homeicon.png";
import contact from "../assets/contacticon.png";
import logout from "../assets/logout.png";
import block from "../assets/logoutdark.png";

const Sidenav = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for logout modal
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setLogoutModalOpen(false); // Close the modal after logout
  };

  return (
    <>
      {/* Top Navigation Bar (Visible on Small Screens) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#301820] z-50 flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className=" flex justify-start">
          <img src={logo} alt="Logo" className="w-[40px]" />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center justify-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-[#b4b189] transition"
            onClick={() => navigate("/Dashboard")}
          >
            <img src={home} alt="Dashboard" className="w-14" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-[#b4b189] transition"
            onClick={() => navigate("/UserManagement")}
          >
            <img src={contact} alt="User Management" className="w-14" />
          </button>
        </div>

        {/* Sign Out Button */}
        <button
          className="p-2 rounded-full hover:bg-[#b4b189] transition"
          onClick={() => setLogoutModalOpen(true)}
        >
          <img src={logout} alt="Logout" className="w-10" />
        </button>
      </div>
      {/* Desktop Sidebar (Visible on Larger Screens) */}
      <div className="hidden md:flex flex-col h-screen bg-[#301820] w-24 items-center px-4 py-6">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <img src={logo} alt="Logo" className="w-[90px]" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 mt-8">
          <button
            className="p-3 rounded-full  h-20 w-20"
            onClick={() => navigate("/Dashboard")}
          >
            <img src={home} alt="Dashboard" className="w-15" />
          </button>
          <button
            className="p-3 rounded-full   h-20 w-20"
            onClick={() => navigate("/UserManagement")}
          >
            <img src={contact} alt="User Management" className="w-15" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-8">
          <button
            onClick={() => setLogoutModalOpen(true)} // Open logout modal
          >
            <img src={logout} alt="Logout" className="cursor-pointer w-12" />
          </button>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 text-center">
            {/* Image */}
            <img
              src={block}
              alt="Logout"
              className="w-16 h-16 mx-auto mb-4 opacity-40"
            />

            {/* Text */}
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Are you sure to sign out your account?
            </h2>

            {/* Buttons */}
            <div className="mt-4 flex flex-col justify-center gap-4">
              {/* Sign Out Button */}
              <button
                className="px-4 py-2 rounded-full font-bold text-white bg-[#301820] hover:bg-[#402030] transition"
                onClick={handleLogout}
              >
                Sign Out
              </button>

              {/* Cancel Button */}
              <button
                className="px-4 py-2 font-bold rounded-md bg-white text-black border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidenav;

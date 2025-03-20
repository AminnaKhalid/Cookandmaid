import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Ensure you have installed lucide-react
import logo from "../assets/logotext.png";
import home from "../assets/homeicon.png";
import contact from "../assets/contacticon.png";
import logout from "../assets/logout.png";
import block from "../assets/logoutdark.png"; // Use the same image as before

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for logout modal
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setLogoutModalOpen(false); // Close the modal after logout
  };

  return (
    <>
      {/* Hamburger Menu Button (Fixed at Top-Left on Small Screens) */}
      <button
        className="fixed top-4 left-4 md:hidden z-50 bg-[#301820] p-2 rounded-md text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={32} />
      </button>

      {/* Overlay for Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="fixed top-0 left-0 h-full bg-[#301820] w-56 flex flex-col items-center px-4 py-6"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} className="cursor-pointer" />
            </button>

            {/* Logo */}
            <div className="w-full flex justify-center mt-8">
              <img src={logo} alt="Logo" className="w-[120px] md:w-[90px]" />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-6 mt-8">
              <button
                className="p-3 rounded-full hover:bg-[#b4b189] transition"
                onClick={() => {
                  navigate("/Dashboard");
                  setIsOpen(false);
                }}
              >
                <img src={home} alt="Dashboard" className="w-12" />
              </button>
              <button
                className="p-3 rounded-full hover:bg-[#b4b189] transition"
                onClick={() => {
                  navigate("/UserManagement");
                  setIsOpen(false);
                }}
              >
                <img src={contact} alt="User Management" className="w-12" />
              </button>
            </div>

            {/* Logout Button */}
            <div className="mt-auto mb-8">
              <button
                onClick={() => setLogoutModalOpen(true)} // Open logout modal
              >
                <img
                  src={logout}
                  alt="Logout"
                  className="cursor-pointer w-12"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen bg-[#301820] w-24 items-center px-4 py-6">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <img src={logo} alt="Logo" className="w-[90px]" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 mt-8">
          <button
            className="p-3 rounded-full hover:bg-[#b4b189] transition h-20 w-20"
            onClick={() => navigate("/Dashboard")}
          >
            <img src={home} alt="Dashboard" className="w-40" />
          </button>
          <button
            className="p-3 rounded-full hover:bg-[#b4b189] transition h-20 w-20"
            onClick={() => navigate("/UserManagement")}
          >
            <img src={contact} alt="User Management" className="w-40" />
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
              className="w-16 h-16 mx-auto mb-4 opacity-40" // Added opacity-75
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

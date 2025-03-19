import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Ensure you have installed lucide-react
import logo from "../assets/logotext.png";
import home from "../assets/homeicon.png";
import contact from "../assets/contacticon.png";
import logout from "../assets/logout.png";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative">
      {/* Hamburger Menu Button (Hidden When Sidebar is Open) */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 md:hidden z-50 bg-[#301820] p-2 rounded-md text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={32} />
        </button>
      )}

      {/* Overlay for Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 transition-all duration-300 bg-black/50 md:hidden">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-[#301820] w-56 flex flex-col items-center px-4 py-6 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:w-24`}
          >
            {/* Close Button (Only One Cross Button Now!) */}
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
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  navigate("/");
                  setIsOpen(false);
                }}
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
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/");
            }}
          >
            <img src={logout} alt="Logout" className="cursor-pointer w-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;

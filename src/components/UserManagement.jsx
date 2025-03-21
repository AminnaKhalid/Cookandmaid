import React, { useState } from "react";
import Sidenav from "./Sidenav";
import prevIcon from "../assets/back.png";
import nextIcon from "../assets/front.png";
import searchIcon from "../assets/search.png";
import downArrow from "../assets/down.png";
import Table from "./Table";

const navItems = [
  "All Users",
  "Service Providers",
  "Service Seekers",
  "Blocked Users",
];

const totalEntries = 153;
const entriesPerPage = 10;

const UserManagement = () => {
  const [selected, setSelected] = useState("All Users");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      {/* Sidebar */}
      <Sidenav />

      <div className="flex-1 p-4 md:p-0 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="mb-4 bg-white border-b-[1px] border-gray-300 py-3">
          <h1 className="text-xl md:text-2xl font-bold uppercase text-end md:text-left px-4">
            User Management
          </h1>
          {/* <hr className="border-gray-300 mt-2" /> */}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full px-2 py-3 py-0">
          {/* Search Bar - Takes 75% width */}
          <div className="w-full md:w-3/4 relative">
            <input
              type="text"
              placeholder="Search for a user..."
              className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full pl-10"
            />
            {/* Search Icon */}
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2"
            />
          </div>

          {/* Dropdown */}
          <div className="w-full md:w-1/4 relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm flex justify-between items-center w-full"
              aria-label="Open dropdown"
            >
              {selected}
              {/* Down Arrow Icon */}
              <img src={downArrow} alt="Dropdown" className="w-4 h-2 ml-2" />
            </button>

            {isOpen && (
              <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 shadow-md rounded-md z-10">
                {navItems.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Table Component */}
        <Table />

        {/* Pagination */}
        <nav className="flex flex-col md:flex-row items-center justify-between mt-4 bg-white py-3 gap-4 px-2">
          {/* First Section: Showing Entries */}
          <div className="text-gray-600 text-sm md:text-base">
            Showing <b>{startEntry}</b> to <b>{endEntry}</b> of{" "}
            <b>{totalEntries}</b> entries
          </div>

          {/* Second Section: Pagination with Arrows and Page Numbers */}
          <div className="flex items-center gap-2">
            {/* Previous Arrow */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`p-2 border rounded-md ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <img src={prevIcon} alt="Previous" className="w-4 md:w-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show only the first 3, current page, and last 3 pages on small screens
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded-md text-sm md:text-base ${
                          currentPage === page
                            ? "bg-[#301820] text-white"
                            : "hover:bg-gray-200"
                        }`}
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`p-2 border rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <img src={nextIcon} alt="Next" className="w-4 md:w-5" />
            </button>
          </div>

          {/* Third Section: Static Dropdown */}
          <div className="relative">
            <select
              className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm appearance-none text-sm md:text-base pl-2 pr-8"
              disabled
              aria-label="Entries per page"
            >
              <option>10 entries</option>
            </select>
            {/* Down Arrow Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <img src={downArrow} alt="Dropdown" className="w-4 h-2" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserManagement;

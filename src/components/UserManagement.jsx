import React, { useState } from "react";
import Sidenav from "./Sidenav";
import prevIcon from "../assets/back.png";
import nextIcon from "../assets/front.png";
import profile from "../assets/profilepic.png";
import block from "../assets/blockuser.png";
import unblock from "../assets/unblockuser.png";
import searchIcon from "../assets/search.png"; // Add search icon
import downArrow from "../assets/down.png"; // Add down arrow icon
import starIcon from "../assets/star.png"; // Add star icon

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "Block" or "Unblock"
  const [selectedUser, setSelectedUser] = useState(null); // Track user for action

  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  // Sample users
  const [users, setUsers] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Service Provider" : "Service Seeker",
      status: i % 3 === 0 ? "Blocked" : "Active",
    }))
  );

  // Handle Block/Unblock Action
  const handleAction = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser
          ? { ...user, status: modalType === "Block" ? "Blocked" : "Active" }
          : user
      )
    );
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      {/* Sidebar */}
      <Sidenav />

      <div className="flex-1 p-4 md:p-6 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-bold uppercase text-center md:text-left">
            User Management
          </h1>
          <hr className="border-gray-300 mt-2" />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full">
          {/* Search Bar - Takes 75% width */}
          <div className="w-full md:w-3/4 relative">
            <input
              type="text"
              placeholder="Search for a user..."
              className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full pl-10" // Added pl-10 for padding
            />
            {/* Search Icon */}
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2"
            />
          </div>

          {/* Dropdown - Takes 25% width */}
          <div className="w-full md:w-1/4 relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm flex justify-between items-center w-full"
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

        {/* User Table */}
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden  flex-grow">
          <table className="w-full border border-gray-200 text-sm md:text-base">
            {/* Table Header */}
            <thead className="bg-white text-gray-400 font-extralight">
              <tr className="h-12 md:h-16">
                <th className="border border-gray-200 px-2 md:px-4 py-2">
                  User
                </th>
                <th className="border border-gray-200 px-2 md:px-4 py-2">
                  Role
                </th>
                <th className="border border-gray-200 px-2 md:px-4 py-2">
                  Rating
                </th>{" "}
                {/* New Column */}
                <th className="border border-gray-200 px-2 md:px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="mb-5">
              {/* Display only 6-7 rows of data */}
              {users.slice(0, 6).map((user) => (
                <tr key={user.id} className="h-12 md:h-16 text-center">
                  <td className="border border-gray-200 px-2 md:px-4 py-2">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center">
                      <img
                        src={profile}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                        alt="Profile"
                      />
                      <span className="text-gray-700 font-medium">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="border border-gray-200 px-2 md:px-4 py-2 text-gray-600">
                    {user.role}
                  </td>

                  {/* New Column: Rating */}
                  <td className="border border-gray-200 px-2 md:px-4 py-2">
                    <div className="flex items-center justify-center gap-1">
                      {/* Star Icon */}
                      <img src={starIcon} alt="Star" className="w-5 h-5" />
                      {/* Rating Text */}
                      <span className="text-gray-700">4.9 (156)</span>
                    </div>
                  </td>

                  <td className="border border-gray-200 px-2 md:px-4 py-2">
                    <div className="flex justify-center items-center">
                      <button
                        className="w-24 md:w-32 flex items-center justify-center gap-2 bg-[#ECDAC6] text-black px-3 py-1 md:px-4 md:py-2 rounded-md shadow hover:bg-[#e5c7b3] transition"
                        onClick={() => {
                          setModalType(
                            user.status === "Blocked" ? "Unblock" : "Block"
                          );
                          setSelectedUser(user.id);
                          setModalOpen(true);
                        }}
                      >
                        {user.status === "Blocked" ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!modalOpen && (
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 bg-white py-3 gap-4">
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
              >
                <img src={nextIcon} alt="Next" className="w-4 md:w-5" />
              </button>
            </div>

            {/* Third Section: Static Dropdown */}
            <div className="relative">
              <select
                className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm appearance-none text-sm md:text-base pl-2 pr-8" // Adjusted padding
                disabled
              >
                <option>10 entries</option>
              </select>
              {/* Down Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <img src={downArrow} alt="Dropdown" className="w-4 h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 text-center">
              {/* Image */}
              <img
                src={modalType === "Block" ? block : unblock}
                alt={modalType}
                className="w-16 h-16 mx-auto mb-4"
              />

              {/* Text */}
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Are you sure to {modalType.toLowerCase()} the user?
              </h2>

              {/* Buttons */}
              <div className="mt-4 flex flex-col justify-center gap-4 font-bold">
                <button
                  className={`px-4 py-3 rounded-4xl text-white ${
                    modalType === "Block"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#301820] hover:bg-[#402030]"
                  } transition`}
                  onClick={handleAction}
                >
                  {modalType}
                </button>
                {/* Cancel Button */}
                <button
                  className="px-4 py-2 font-bold rounded-md bg-white text-black hover:bg-gray-100 transition"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

import React, { useState } from "react";
import Sidenav from "./Sidenav";
import prevIcon from "../assets/back.png";
import nextIcon from "../assets/front.png";
import blockIcon from "../assets/block.png";
import profile from "../assets/profilepic.png";
import block from "../assets/blockuser.png";
import unblock from "../assets/unblockuser.png";

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
    Array.from({ length: entriesPerPage }, (_, i) => ({
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
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          />

          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm flex justify-between items-center w-full md:w-48"
            >
              {selected}
              <span className="ml-2">▼</span>
            </button>

            {isOpen && (
              <ul className="absolute left-0 mt-2 w-full md:w-48 bg-white border border-gray-300 shadow-md rounded-md z-10">
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
        <div className="w-full bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full border border-gray-400 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700 h-12 md:h-16">
                <th className="border px-2 md:px-4 py-2">User</th>
                <th className="border px-2 md:px-4 py-2">Role</th>
                <th className="border px-2 md:px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="h-12 md:h-16 text-center">
                  <td className="border px-2 md:px-4 py-2">
                    <div className="flex items-center gap-2 md:gap-3 justify-center">
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

                  <td className="border px-2 md:px-4 py-2 text-gray-600">
                    {user.role}
                  </td>

                  <td className="border px-2 md:px-4 py-2">
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
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 bg-white py-3">
            <div className="text-gray-600 text-center md:text-left">
              Showing <b>{startEntry}</b> to <b>{endEntry}</b> of{" "}
              <b>{totalEntries}</b> entries
            </div>

            <div className="flex items-center gap-2">
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
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
              <h2 className="text-xl font-semibold text-center mb-2">
                {modalType} User
              </h2>
              <p className="text-center text-gray-600">
                Are you sure you want to {modalType.toLowerCase()} this user?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-4 py-2 border border-gray-400 rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={handleAction}
                >
                  {modalType}
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

import React, { useState } from "react";
import profile from "../assets/profilepic.png";

const usersData = [
  { id: 1, name: "John Doe", role: "Admin", rating: 4.9, reviews: 160 },
  { id: 2, name: "Jane Doe", role: "Moderator", rating: 4.7, reviews: 120 },
  { id: 3, name: "Alice Doe", role: "User", rating: 4.5, reviews: 98 },
  { id: 4, name: "John Doe", role: "Admin", rating: 4.8, reviews: 142 },
  { id: 5, name: "John Doe", role: "User", rating: 4.2, reviews: 76 },
  { id: 6, name: "John Doe", role: "Moderator", rating: 4.6, reviews: 133 },
];

const Management = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set selected user
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle Block/Unblock action
  const handleBlockUnblock = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, blocked: !user.blocked } : user
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-auto">
      <table className="w-full border border-gray-400">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200 text-gray-700 h-16">
            <th className="border border-gray-400 px-4 py-3">User</th>
            <th className="border border-gray-400 px-4 py-3">Role</th>
            <th className="border border-gray-400 px-4 py-3">Rating</th>
            <th className="border border-gray-400 px-4 py-3">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="h-16 text-center">
              {/* Profile + Name */}
              <td className="border border-gray-400 px-4 py-3">
                <div className="flex flex-row  items-center justify-center gap-4">
                  <img
                    src={profile}
                    className="w-12 h-12 rounded-full"
                    alt="Profile"
                  />
                  <span className="text-gray-700 font-medium mt-2">
                    {user.name}
                  </span>
                </div>
              </td>

              {/* Role */}
              <td className="border border-gray-400 px-4 py-3 text-gray-600">
                {user.role}
              </td>

              {/* Rating */}
              <td className="border border-gray-400 px-4 py-3">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-yellow-500 text-lg">
                    ⭐ {user.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({user.reviews})
                  </span>
                </div>
              </td>

              {/* Block/Unblock Button */}
              <td className="border border-gray-400 px-4 py-3 text-bla">
                <button
                  className={`px-4 py-1 rounded-md ${
                    user.blocked
                      ? "bg-[#ECDAC6] hover:bg-green-600"
                      : "bg-[#ECDAC6] hover:bg-red-600"
                  } text-white`}
                  onClick={() => openModal(user)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {selectedUser.blocked ? "Unblock User" : "Block User"}
            </h2>
            <p className="mb-4">
              Are you sure you want to{" "}
              {selectedUser.blocked ? "unblock" : "block"}{" "}
              <strong>{selectedUser.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedUser.blocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
                onClick={handleBlockUnblock}
              >
                {selectedUser.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;

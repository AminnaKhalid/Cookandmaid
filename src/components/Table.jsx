import React, { useState } from "react";
import profilepic from "../assets/profilepic.png";
import star from "../assets/star.png";
import block from "../assets/blockuser.png";
import unblock from "../assets/unblockuser.png";

const data = [
  {
    id: 1,
    name: "Amna",
    role: "Service Seeker",
    rating: "4.9(130)",
    action: "Testing",
    status: "Active",
  },
  {
    id: 2,
    name: "Amna",
    role: "Trainer",
    rating: "4.9(130)",
    action: "Testing",
    status: "Active",
  },
  {
    id: 3,
    name: "Amna",
    role: "Trainer",
    rating: "4.9(130)",
    action: "Testing",
    status: "Blocked",
  },
  {
    id: 4,
    name: "Amna",
    role: "Service Seeker",
    rating: "4.9(130)",
    action: "Testing",
    status: "Active",
  },
  {
    id: 5,
    name: "Amna",
    role: "Trainer",
    rating: "4.9(130)",
    action: "Testing",
    status: "Active",
  },
  {
    id: 6,
    name: "Amna",
    role: "Trainer",
    rating: "4.9(130)",
    action: "Testing",
    status: "Blocked",
  },
];

const Table = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(data); // State to manage users

  const handleAction = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser
          ? {
              ...user,
              status: modalType === "Block" ? "Blocked" : "Active",
            }
          : user
      )
    );
    setModalOpen(false);
  };

  return (
    <>
      <div className="m-2">
        <div className="grid md:grid-cols-6 grid-cols-5 text-center mb-4">
          <div className="border border-gray-300 md:p-2 p-0 font-medium md:font-semibold bg-white text-gray-400 md:col-span-2 col-span-1 text-sm md:text-md">
            User
          </div>
          <div className="border border-gray-300 md:p-2 p-0 font-medium md:font-semibold bg-white text-gray-400 col-span-1 text-sm md:text-md">
            Role
          </div>
          <div className="border border-gray-300 md:p-2 p-0 font-medium md:font-semibold bg-white text-gray-400 col-span-1 text-sm md:text-md">
            Rating
          </div>
          <div className="border border-gray-300 md:p-2 p-0 font-medium md:font-semibold bg-white text-gray-400 col-span-2 text-sm md:text-md">
            Action
          </div>
        </div>
        {users.map((item) => (
          <div
            className="grid md:grid-cols-6 grid-cols-5 text-center"
            key={item.id}
          >
            {/* User Column */}
            <div className="border border-gray-300 px-2 py-4 md:font-medium font-normal text-sm md:text-md bg-white md:col-span-2 col-span-1">
              <div className="flex items-center justify-center flex-col md:flex-row">
                <img src={profilepic} alt="" className="w-10 h-10 mx-4" />
                <span>{item.name}</span>
              </div>
            </div>

            {/* Role Column */}
            <div className="border border-gray-300 md:px-2 py-4 px-1 md:font-medium font-normal bg-white col-span-1 text-sm md:text-md flex items-center justify-center">
              {item.role}
            </div>

            {/* Rating Column */}
            <div className="border border-gray-300 px-2 py-4 md:font-medium font-normal bg-white col-span-1 flex items-center justify-center">
              <div className="flex flex-col md:flex-row justify-center items-center text-sm md:text-md">
                <img src={star} alt="" className="h-5 w-5 mx-2" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Action Column */}
            <div className="border border-gray-300 px-2 py-4 md:font-medium font-normal bg-white col-span-2 flex items-center justify-center">
              <button
                className="md:w-40 md:h-10 h-8 w-20 bg-[#ECDAC6] text-black rounded-2xl"
                onClick={() => {
                  setModalType(item.status === "Blocked" ? "Unblock" : "Block");
                  setSelectedUser(item.id);
                  setModalOpen(true);
                }}
              >
                {item.status === "Blocked" ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))}
      </div>
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
    </>
  );
};

export default Table;

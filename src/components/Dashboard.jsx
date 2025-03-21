import React from "react";
import Sidenav from "./Sidenav";
import Heading from "./Heading";
import Card from "./Card";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row w-full h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="h-screen">
          <Sidenav />
        </div>
        {/* Main Content */}
        <div className="w-full">
          <div className="mb-4 bg-white border-b-[1px] border-gray-300 py-3">
            <h1 className="text-xl md:text-2xl font-bold uppercase text-center md:text-left px-4">
              Dashboard
            </h1>
          </div>
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-6 py-2 ">
            <Card Title="All Users" Statistics="32456" />
            <Card Title="Service Seeker" Statistics="7890" />
            <Card Title="Service Provider" Statistics="5678" />
            <Card Title="Revenue" Statistics="7890" />
            <Card Title="All Users" Statistics="5678" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

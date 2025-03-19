import React from "react";
import Sidenav from "./Sidenav";
import Heading from "./Heading";
import Card from "./Card";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row w-full h-screen">
        {/* Sidebar */}
        <div className=" h-screen">
          <Sidenav />
        </div>
        {/* Main Content */}
        <div className="w-full p-6">
          {/* Heading */}
          <Heading title="Dashboard" className="..." />
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-6 ">
            <Card Title="Web Amna" Statistics="32456" />
            <Card Title="Second Card" Statistics="7890" />
            <Card Title="Third Card" Statistics="5678" />
            <Card Title="Second Card" Statistics="7890" />
            <Card Title="Third Card" Statistics="5678" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

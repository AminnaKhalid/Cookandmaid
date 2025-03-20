import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="w-full  text-black font-bold text-2xl md:text-3xl p-4 border-b-[1px] border-gray-400 flex items-center justify-end md:justify-start">
      {title}
    </div>
  );
};

export default Heading;

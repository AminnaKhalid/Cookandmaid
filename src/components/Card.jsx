import React from "react";

const Card = ({ Title, Statistics }) => {
  return (
    <div className="py-7 px-5 drop-shadow-lg border-1 border-gray-300 m-4 shadow-gray-500 rounded-2xl">
      <div className="text-gray-400 font-medium text-2xl">{Title}</div>
      <div className="text-2xl md:text-4xl font-bold">{Statistics}</div>
    </div>
  );
};

export default Card;

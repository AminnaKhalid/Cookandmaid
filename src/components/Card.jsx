import React from "react";

const Card = ({ Title, Statistics }) => {
  return (
    <div className="py-5 px-5 border-1 border-gray-300 m-4 rounded-lg">
      <div className="text-gray-600 font-normal text-2xl my-2 ">{Title}</div>
      <div className="text-2xl md:text-4xl font-bold">{Statistics}</div>
    </div>
  );
};

export default Card;

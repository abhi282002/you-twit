import React from "react";

interface ele {
  item: number;
}

const Shimmer = (item: ele) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto  h-auto mt-12 
      ">
        {Array(12)
          .fill("")
          .map((e, index) => (
            <div className="flex flex-col" key={index}>
              <div className=" w-60 h-40 border  bg-gray-200  text-black/100"></div>
              <div className=" mt-4 ml-0.5 w-36 h-3 border-grey border-2 rounded-md bg-gray-200"></div>
              <div className=" mt-4 ml-0.5 w-20 h-3 border-grey border-2 rounded-md bg-gray-200"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;

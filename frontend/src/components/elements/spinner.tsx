import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 text-primary text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;

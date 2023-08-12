import React from "react";

function Loader() {
  return (
    <div className="flex justify-center">
      <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#005ABC] border-l-[#005ABC] animate-spin"></div>
    </div>
  );
}

export default Loader;

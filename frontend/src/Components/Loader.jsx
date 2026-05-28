import React from "react";
import Sidebar from "./Sidebar";

const Loader = () => {
  return (
    <div className="h-[600px] w-[350px] lg:h-screen lg:w-screen">
      <Sidebar/>  
      <div className="h-full flex justify-center items-center">
        <div className="h-14 w-14 border-4 rounded-full border-blue-200 border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;

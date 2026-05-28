import { Check } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alertButton = useSelector((state)=>state.alertButton.value);
  return (
    <div className="w-screen flex justify-center relative top-20 z-30">
      <div className="bg-white border-2 border-black rounded-xl p-5 py-2 h-fit w-fit flex gap-x-5 justify-center items-center">
        <div className="h-8 w-8 bg-green-400 rounded-full flex justify-center items-center">
          <Check color="white" size={28} />
        </div>
        <h1 className="text-black font-semibold">{alertButton.payload}</h1>
      </div>
    </div>
  );
};

export default Alert;

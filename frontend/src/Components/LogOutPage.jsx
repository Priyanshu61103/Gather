import React from "react";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const LogOutPage = () => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };
  return (
    <div>
      <button className="h-fit w-fit border-2 border-red-400 lg:p-2 p-1 rounded-lg flex gap-x-2" onClick={logOutHandler}>
        <LogOut color="red" />
        <div className="text-red-500 font-semibold text-sm lg:text-lg">
          Logout
        </div>
      </button>
    </div>
  );
};

export default LogOutPage;

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { setEditButton } from "../Redux/Slice/editSlice.js";
const ProfilePopUp = () => {
  const editButton = useSelector((state) => state.editButton.value);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileData.value);
  console.log(profileData);
  return (
    <div className="h-[500px] w-[325px] lg:h-screen lg:w-screen">
      <div></div>
      <div>
        {!editButton && (
          <div className="relative left-32 lg:left-[700px] w-72 h-40 lg:w-96 p-3 flex flex-wrap justify-center items-center bg-white border-2 border-black rounded-xl">
            <div className="flex gap-x-4">
              <div className="h-8 w-12 bg-green-400 rounded-full flex justify-center items-center">
                <Check color="white" size={28} />
              </div>
              <h1 className="font-bold text-sm lg:text-lg text-gray-700">
                Please Complete your Profile and start this journey with Gather.
              </h1>
            </div>
            <div className="w-full flex justify-end mt-2">
              <button
                onClick={() => dispatch(setEditButton())}
                className="bg-green-400 text-white font-semibold rounded-xl p-2 flex gap-x-2 justify-center items-center"
              >
                <Edit />
                Complete Profile
              </button>
            </div>
          </div>
        )}

        {editButton && (
          <div className="fixed lg:top-5 top-40 left-2 lg:left-[500px] z-40">
            <EditProfile data={profileData.payload[0]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePopUp;

import React, { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "./Sidebar";
import { Show } from "@clerk/react";
import SignInPage from "./SignInPage";
import Feed from "./Feed";
import { useSelector } from "react-redux";
import CreateStory from "./CreateStory.jsx";
import ProfilePopUp from "./ProfilePopUp.jsx";
import Loader from "./Loader.jsx";
import { useDispatch } from "react-redux";
import { setProfileData } from "../Redux/Slice/profileDataSlice.js";
import { setUserProfileData } from "../Redux/Slice/userProfileDataSlice.js";
import CommentSection from "./CommentSection.jsx";
import Share from "./Share.jsx";

function HomePage() {
  const storyButton = useSelector((state) => state.storyButton.value);
  const editButton = useSelector((state) => state.editButton.value);
  const profileData = useSelector((state) => state.profileData.value);
  const dispatch = useDispatch();
  const username = localStorage.getItem("user");
  const full_name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const commentSection = useSelector((state) => state.commentSection.value);
  const share = useSelector((state) => state.share.value);
  const [profile, setProfile] = useState();
  const getProfileData = async () => {
    try {
      const response = await fetch(
        `/api/profile`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (!response) {
        alert("Error");
        return;
      }
      const data = await response.json();
      if (data.success) {
        dispatch(setProfileData(data.result));
        setProfile(data.result);
        dispatch(setUserProfileData(data.result));
        return;
      } else {
        alert("Error");
        return;
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      return;
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="h-fit pb-10 w-fit lg:w-[1350px] bg-gray-200">
      <div>
        {profile && profile[0] && username == full_name && (
          <div className="fixed w-full h-screen flex justify-center items-center z-20">
            <div className="mr-80">
              <ProfilePopUp />
            </div>
          </div>
        )}
        <div className="relative z-50">
          <Sidebar />
        </div>
        <div
          className={
            profile && username != full_name
              ? "h-auto z-0 lg:z-1"
              : "opacity-10 z-0 lg:z-10"
          }
        >
          <div className="mt-16 lg:mt-0">
            <Feed />
          </div>
          {storyButton && <CreateStory />}
          {commentSection != "" && <CommentSection />}
          {share != "" && <Share />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

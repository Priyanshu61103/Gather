import React, { useEffect, useRef, useState } from "react";
import { UserButton, useUser } from "@clerk/react";
import { Home, MessageCircle, Search, UserIcon, Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { setSelectedPage } from "../Redux/Slice/pageSlice.js";
import { setAlertButton } from "../Redux/Slice/alertButtonSlice.js";
import { setProfileData } from "../Redux/Slice/profileDataSlice.js";
const Sidebar = () => {
  const storyButton = useSelector((state) => state.storyButton.value);
  const selectedPage = useSelector((state) => state.selectedPage.value);
  const profileData = useSelector((state) => state.profileData.value);
  const userProfileData = useSelector((state) => state.userProfileData.value);
  const commentSection = useSelector((state) => state.commentSection.value);
  const share = useSelector((state) => state.share.value);
  const email = localStorage.getItem("email");
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const sidebarRef = useRef();
  const username = localStorage.getItem("user");
  const dispatch = useDispatch();
  console.log(userProfileData);

  const sidebarHandler = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  return (
    <div className="z-50">
      <div className={
          !storyButton && commentSection == "" && share == ""
            ? "block lg:hidden h-16 w-[385px] border-2 bg-white fixed top-0 z-0"
            : "block lg:hidden h-16 w-[385px] border-2 bg-white pfixed top-0 opacity-10 z-0 "
          }>
        <div className="flex gap-x-12">
          <img
            src="https://ik.imagekit.io/priyanshu61103/icon.png"
            alt=""
            className="h-16 w-16 relative top-1"
            onClick={sidebarHandler}
          />
          <img
            src="https://ik.imagekit.io/priyanshu61103/gather-logo.png"
            alt=""
            className="relative bottom-10 right-20 h-36 w-36"
          />
        </div>
      </div>
      <div
        ref={sidebarRef}
        className={
          !storyButton && commentSection == "" && share == ""
            ? `${sidebarVisibility ? "block":"hidden"} lg:block min-h-screen h-fit w-fit border-2 bg-white pl-10 pr-8 fixed inset-y-0 left-0`
            : `${sidebarVisibility ? "block":"hidden"} lg:block min-h-screen h-fit w-fit border-2 bg-white pl-10 pr-8 fixed inset-y-0 left-0 opacity-10`
        }
      >
        <div>
          <div className="flex relative right-10 lg:right-0">
            <img
              src="../icon.png"
              alt=""
              className="block lg:hidden h-16 w-16 relative top-3"
              onClick={sidebarHandler}
            />
            <img src="https://ik.imagekit.io/priyanshu61103/gather-logo.png" alt="" className="h-36 w-36 lg:h-60 lg:w-60 relative bottom-8 right-7 lg:bottom-10 lg:right-7" />
          </div>
          <div className="mt-16 lg:mt-0">
            <div className="w-60 flex flex-wrap relative bottom-10">
              <Link to="/">
                <button
                  onClick={() => dispatch(setSelectedPage("Feed"))}
                  className={
                    selectedPage == "Feed" || selectedPage.payload == "Feed"
                      ? "flex p-2 w-60 items-center justify-start rounded-lg pr-7 pl-1 gap-x-2 bg-gray-200"
                      : "flex p-2 w-60 items-center justify-start rounded-lg pr-7 pl-1 gap-x-2"
                  }
                >
                  <div>
                    <Home />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-semibold">
                      Feed
                    </h1>
                  </div>
                </button>
              </Link>

              <Link to="/messages">
                <button
                  onClick={() => dispatch(setSelectedPage("Messages"))}
                  className={
                    selectedPage.payload == "Messages"
                      ? "flex w-60 items-center justify-start rounded-lg p-2 pl-1 gap-x-2 bg-gray-200"
                      : "flex w-60 items-center justify-start rounded-lg p-2 pl-1 gap-x-2"
                  }
                >
                  <div>
                    <MessageCircle />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-semibold">
                      Messages
                    </h1>
                  </div>
                </button>
              </Link>

              <Link to="/connections">
                <button
                  onClick={() => dispatch(setSelectedPage("Connections"))}
                  className={
                    selectedPage.payload == "Connections"
                      ? "flex w-60 items-center justify-start rounded-lg p-2 pl-1 gap-x-2 bg-gray-200"
                      : "flex w-60 items-center justify-start rounded-lg p-2 pl-1 gap-x-2"
                  }
                >
                  <div>
                    <Users />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-semibold">
                      Connections
                    </h1>
                  </div>
                </button>
              </Link>

              <Link to="/discover">
                <button
                  onClick={() => dispatch(setSelectedPage("Discover"))}
                  className={
                    selectedPage.payload == "Discover"
                      ? "flex w-60 items-center justify-start rounded-lg p-2 px-7 pl-1 gap-x-3 bg-gray-200"
                      : "flex w-60 items-center justify-start rounded-lg p-2 px-7 pl-1 gap-x-3"
                  }
                >
                  <div>
                    <Search />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-semibold">
                      Discover
                    </h1>
                  </div>
                </button>
              </Link>

              <Link to={`/profile/${email}`}>
                <button
                  onClick={() => dispatch(setSelectedPage("Profile"))}
                  className={
                    selectedPage.payload == "Profile"
                      ? "flex w-60 items-center justify-start rounded-lg p-2 px-7 pl-1 gap-x-2 bg-gray-200"
                      : "flex w-60 items-center justify-start rounded-lg p-2 px-7 pl-1 gap-x-2"
                  }
                >
                  <div>
                    <UserIcon />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-semibold">
                      Profile
                    </h1>
                  </div>
                </button>
              </Link>

              <Link to="/create-post">
                <button className="h-12 w-60 bg-black rounded-lg flex justify-center items-center gap-x-2 mt-2">
                  <img src="https://ik.imagekit.io/priyanshu61103/plus-icon.png" alt="" className="h-5 w-5" />
                  <h1 className="text-lg font-semibold text-white">
                    Create Post
                  </h1>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {userProfileData.payload && userProfileData.payload[0] && (
          <Link to={`/profile/${email}`}>
            <div className="flex gap-x-2 mt-24 relative lg:bottom-10 bottom-0 hover:bg-gray-300 rounded-xl p-2">
              {profileData.payload[0].profile_picture ? (
                <img
                  src={userProfileData.payload[0].profile_picture}
                  className="h-10 w-10 rounded-full border-2 border-black"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/priyanshu61103/profile-logo.png"
                  className="h-10 w-10 rounded-full border-2 border-black"
                />
              )}
              <div>
                <h1 className="font-semibold text-gray-600">
                  {localStorage.getItem("name")}
                </h1>
                <h2 className="text-sm text-gray-800">@{username}</h2>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

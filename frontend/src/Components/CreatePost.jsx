import React, { useState } from "react";
import SignInPage from "./SignInPage";
import Sidebar from "./Sidebar";
import { Image } from "lucide-react";
import { setAlertButton } from "../Redux/Slice/alertButtonSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
const CreatePost = () => {
  const [postData, setPostData] = useState({
    content: "",
    image_urls: [],
  });
  const alertButton = useSelector((state) => state.alertButton.value);
  const profileData = useSelector((state) => state.profileData.value);
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      console.log(postData);
      if (postData.content == "" && postData.image_urls == []) {
        alert("Write Something to Post");
        return;
      }
      const formData = new FormData();
      formData.append("user", profileData.payload[0].email);
      formData.append("content", postData.content);
      if (postData.image_urls != [])
        formData.append("image_urls", postData.image_urls[0]);
      else formData.append("image_urls", postData.image_urls);
      if (postData.content != "" && formData.get("image_urls") != "undefined")
        formData.append("post_type", "text with image");
      else if (formData.get("image_urls") != "undefined")
        formData.append("post_type", "image");
      else formData.append("post_type", "text");
      formData.append("likes_count", []);
      formData.append("createdAt", new Date());
      formData.append("updatedAt", new Date());
      console.log(Object.fromEntries(formData));

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-post`, {
        method: "POST",
        body: formData,
        credentials:"include"
      });

      if (!response) {
        alert("Error");
        return;
      }

      const data = await response.json();
      if (data.success) {
        setTimeout(() => {
          dispatch(setAlertButton(""));
        }, 5000);
        dispatch(setAlertButton("Posted Successfully"));
        return;
      } else {
        setTimeout(() => {
          dispatch(setAlertButton(""));
        }, 5000);
        dispatch(setAlertButton("Not Posted"));
        return;
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(setAlertButton(""));
      }, 5000);
      dispatch(setAlertButton(error.message));
      return;
    }
  };

  return (
    <div>
      <div className="bg-gray-200">
        {alertButton.payload != "" && alertButton.payload && <Alert />}
        <div className="h-screen flex flex-col lg:ml-72 lg:py-10 lg:px-16 w-full">
          <Sidebar />
          <div className="ml-4 lg:ml-0 mt-20 lg:mt-0">
            <h1 className="text-black text-2xl lg:text-4xl font-bold">Create Post</h1>
            <p className="text-gray-600 font-semibold lg:mt-2">
              Share your thoughts with the world
            </p>
          </div>
          <div className="h-fit w-fit bg-white rounded-xl p-2 lg:p-5 m-5">
            {(profileData && profileData.payload) && (
              <div className="flex gap-x-2">
                {profileData.payload[0].profile_picture != "" ? <img
                  src={profileData.payload[0].profile_picture}
                  alt=""
                  className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                />:<img
                  src="../profile-logo-2.png"
                  alt=""
                  className="h-12 w-12 lg:h-16 lg:w-16 rounded-full"
                />}
                <div>
                  <h1 className="font-bold text-sm lg:text-lg">
                    {profileData.payload[0].full_name}
                  </h1>
                  <div className="flex justify-center items-center gap-x-2 text-gray-600 text-sm">
                    <p>@{profileData.payload[0].username}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-2 lg:p-5">
              <textarea
                name="new-post"
                id="new-post"
                placeholder="What's happening ?"
                onChange={(event) =>
                  setPostData({ ...postData, content: event.target.value })
                }
                className="h-28 w-64 lg:w-96 p-2 outline-none border-b-4 border-gray-400 placeholder:text-gray-300"
              ></textarea>
            </div>
            <div className="w-full flex justify-between items-center px-4">
              <div>
                <label htmlFor="post-image">
                  <Image />
                </label>
                <input
                  onChange={(event) => {
                    setPostData({
                      ...postData,
                      image_urls: Array.from(event.target.files),
                    });
                  }}
                  type="file"
                  id="post-image"
                  className="hidden"
                />
              </div>
              <button
                onClick={submitHandler}
                className="h-fit w-fit p-4 lg:p-7 lg:py-3 bg-black text-white rounded-xl flex justify-center items-center"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
